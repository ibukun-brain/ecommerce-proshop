from rest_framework import permissions


class IsSeller(permissions.BasePermission):
    message = 'You are not a seller!'
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user.role == "seller"