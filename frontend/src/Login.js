import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "./firebase";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const qualifications = ["10th Pass", "12th Pass", "Currently in Graduation"];

const genders = ["Male", "Female", "Other"];

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setSubmitted(false);
    setFullName("");
    setDob("");
    setGender("");
    setQualification("");
    setDistrict("");
    setState("");
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !dob || !qualification || !state || !district) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    try {
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        dob,
        gender,
        qualification,
        district,
        state,
        email: user.email,
        photoURL: user.photoURL || "",
        lastUpdated: new Date(),
      });
      setSubmitted(true);
    } catch (err) {
      setError("Failed to save profile: " + err.message);
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign in to Your Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleGoogleLogin}
          sx={{ mt: 3 }}
        >
          Sign in with Google
        </Button>
      </Box>
    );
  }

  if (submitted) {
    return (
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome, {user.displayName}!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your profile info has been submitted successfully.
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Complete Your Profile
      </Typography>
      <form onSubmit={handleProfileSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          fullWidth
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-label">Gender (optional)</InputLabel>
          <Select
            labelId="gender-label"
            value={gender}
            label="Gender (optional)"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Useful for scholarships and targeted info
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="qualification-label">
            Class / Qualification
          </InputLabel>
          <Select
            labelId="qualification-label"
            value={qualification}
            label="Class / Qualification"
            onChange={(e) => setQualification(e.target.value)}
            required
          >
            {qualifications.map((q) => (
              <MenuItem key={q} value={q}>
                {q}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="District"
          variant="outlined"
          fullWidth
          required
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          margin="normal"
          helperText="Will help suggest nearby govt colleges"
        />

        <TextField
          label="State"
          variant="outlined"
          fullWidth
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
          margin="normal"
          helperText="Will help suggest nearby govt colleges"
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
          <Button type="submit" variant="contained">
            Submit Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
