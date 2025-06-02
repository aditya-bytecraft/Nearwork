// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimatedBackground from "./AnimatedBackground";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

function App() {
  const [workers, setWorkers] = useState([]);
  const [job, setJob] = useState({ name: "", skill: "", description: "" });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  // Set browser tab title dynamically
  useEffect(() => {
    document.title = "NearWork";
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/workers").then((res) => setWorkers(res.data));
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/jobs", job).then((res) => {
      setMessage(res.data.message);
      setOpen(true);
      setJob({ name: "", skill: "", description: "" });
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <AnimatedBackground />
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#fff",
              textShadow: "0 2px 10px #1976d2, 0 1px 1px #000",
              letterSpacing: 2,
              mb: 1,
            }}
          >
            NearWork
          </Typography>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ color: "#bbdefb", textShadow: "0 1px 4px #1976d2" }}
          >
            Find Local Professionals & Daily Wage Workers Near You
          </Typography>
        </motion.div>

        <Card sx={{ my: 4, p: 2, boxShadow: 8, background: "rgba(25, 118, 210, 0.85)" }}>
          <CardContent>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
                Post a Job
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  label="Your Name"
                  name="name"
                  value={job.name}
                  onChange={handleChange}
                  required
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#bbdefb" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#90caf9" },
                      "&:hover fieldset": { borderColor: "#fff" },
                    },
                  }}
                />
                <TextField
                  label="Skill Needed (e.g., Plumber)"
                  name="skill"
                  value={job.skill}
                  onChange={handleChange}
                  required
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#bbdefb" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#90caf9" },
                      "&:hover fieldset": { borderColor: "#fff" },
                    },
                  }}
                />
                <TextField
                  label="Job Description"
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#bbdefb" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#90caf9" },
                      "&:hover fieldset": { borderColor: "#fff" },
                    },
                  }}
                />
                <Button type="submit" variant="contained" color="secondary" size="large" sx={{ fontWeight: 700 }}>
                  Post Job
                </Button>
              </Box>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "#fff", textShadow: "0 1px 4px #1976d2" }}>
            Available Workers Nearby
          </Typography>
          <List>
            {workers.map((w) => (
              <motion.div
                key={w.id}
                whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(25, 118, 210, 0.25)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ListItem
                  sx={{
                    mb: 1,
                    background: "rgba(255,255,255,0.90)",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <ListItemText
                    primary={
                      <span style={{ fontWeight: 600, color: "#1976d2" }}>{w.name}</span>
                    }
                    secondary={
                      <>
                        <span style={{ color: "#388e3c" }}>{w.skill}</span> — ₹{w.price}{" "}
                        <span style={{ color: "#1976d2" }}>{w.location}</span>
                      </>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </motion.div>

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="success" onClose={handleClose}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default App;
