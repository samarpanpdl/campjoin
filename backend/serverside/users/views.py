# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer


@api_view(['POST'])
def register_user(request):
    print(request.data)
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')

    phone_number = request.data.get('phone')
    age = request.data.get('age')
    join_year = request.data.get('start_date')
    pass_year = request.data.get('end_date')

    print(join_year)
    print(pass_year)
    print(phone_number)

    if User.objects.filter(username=username).exists():
        return Response({'message': 'Username already taken'}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )

    profile = user.profile

    

    # Convert age, join_year, pass_year to int if possible, else None
    def to_int(value):
        try:
            return int(value)
        except (TypeError, ValueError):
            return None
    def to_str(value):
        try:
            val = str(value)
            return val
        except(TypeError,ValueError):
            return None

    profile.age = to_int(age)
    profile.join_year = to_str(join_year)
    profile.pass_year = to_str(pass_year)
    profile.phone_number = to_str(phone_number)

    profile.save()

    return Response({'message': 'User and profile registered successfully'})



@api_view(['POST'])
def login_user(request):
    
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({'message': 'Login successful'}, status=200)
    else:
        return Response({'message': 'Invalid username or password'}, status=401)

@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def get_user_info(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
