import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginDialogProps {
  onLoginSuccess: (username: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * A modal dialog component for user login.
 * Handles form state and placeholder authentication.
 */
const LoginDialog: React.FC<LoginDialogProps> = ({
  onLoginSuccess,
  isOpen,
  onOpenChange,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // --- Placeholder Authentication Logic ---
    // In a real app, you would send these credentials to a backend API.
    if (username === "admin" && password === "admin123") {
      onLoginSuccess(username); // Call the login function from AuthContext
      onOpenChange(false); // Close the dialog
      navigate("/admin/dashboard"); // Navigate to the admin page
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent className="w-full  max-w-[425px] mx-auto flex flex-col items-center justify-center" >
        <DialogHeader>
          <DialogTitle className="font-display text-3xl md:text-4xl font-medium text-gray-800 tracking-wider">
            Admin Login
          </DialogTitle>
          <DialogDescription className="font-body text-gray-600">
            Enter your credentials to access the admin dashboard.
            <br />
            (Hint: admin / admin123)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right font-body">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3 font-body"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right font-body">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3 font-body"
              required
            />
          </div>
          {error && (
            <p className="col-span-4 text-center text-destructive text-sm font-body">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full font-body bg-[#794299] hover:bg-[#62009b]">
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;