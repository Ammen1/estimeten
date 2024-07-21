from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    """
    Custom permission to only allow AdminUsers.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and is an admin user
        return request.user.is_authenticated and hasattr(request.user, 'adminuser')

