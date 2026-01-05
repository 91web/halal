"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Ban, CheckCircle2, Trash2, KeyRound } from "lucide-react"
import { toast } from "sonner"
import { CreateUserDialog } from "./create-user-dialog"
import { SetPasswordDialog } from "./set-password-dialog"

interface User {
  _id: string
  name: string
  email: string
  role: string
  disabled: boolean
  createdAt: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      if (response.ok) {
        setUsers(data.users)
      } else {
        toast.error("Failed to fetch users")
      }
    } catch (error) {
      toast.error("Error fetching users")
    } finally {
      setLoading(false)
    }
  }

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabled: !currentStatus }),
      })

      if (response.ok) {
        toast.success(`User ${!currentStatus ? "disabled" : "enabled"} successfully`)
        fetchUsers()
      } else {
        toast.error("Failed to update user status")
      }
    } catch (error) {
      toast.error("Error updating user status")
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to permanently delete this user?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("User deleted successfully")
        fetchUsers()
      } else {
        toast.error("Failed to delete user")
      }
    } catch (error) {
      toast.error("Error deleting user")
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-slate-500">Loading users...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage platform users, disable accounts for policy violations, or remove users permanently.
            </CardDescription>
          </div>
          <CreateUserDialog onUserCreated={fetchUsers} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  {user.disabled ? (
                    <Badge variant="destructive">Disabled</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser({ id: user._id, name: user.name })
                        setPasswordDialogOpen(true)
                      }}
                      className="gap-2"
                    >
                      <KeyRound className="h-4 w-4" />
                      Password
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleUserStatus(user._id, user.disabled)}
                      className="gap-2"
                    >
                      {user.disabled ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Enable
                        </>
                      ) : (
                        <>
                          <Ban className="h-4 w-4" />
                          Disable
                        </>
                      )}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteUser(user._id)} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {selectedUser && (
        <SetPasswordDialog
          userId={selectedUser.id}
          userName={selectedUser.name}
          open={passwordDialogOpen}
          onOpenChange={setPasswordDialogOpen}
        />
      )}
    </Card>
  )
}
