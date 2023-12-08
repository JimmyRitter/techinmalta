import React, { useState } from "react";
import { TextField, Button, Grid, Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { WorkExperience } from "./profile.types";

interface WorkExperiencesProps {
  defaultExperiences: WorkExperience[];
}

const WorkExperiences: React.FC<WorkExperiencesProps> = ({ defaultExperiences }) => {
  const [experiences, setExperiences] = useState<WorkExperience[]>(defaultExperiences);

  const addExperience = () => {
    setExperiences(prevExperiences => [
      ...prevExperiences,
      { companyName: "", position: "", startDate: "", endDate: "", summary: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, key: keyof WorkExperience, value: string) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience,
    );
    setExperiences(updatedExperiences);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} direction="column">
        <Typography variant={"h6"} sx={{ marginTop: "10px", marginLeft: "16px" }}>Work experiences</Typography>
        {experiences.map((experience, index) => (
          <Grid item key={index} xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Company Name"
                variant="outlined"
                value={experience.companyName}
                onChange={(e) => updateExperience(index, "companyName", e.target.value)}
                fullWidth
                required
                sx={{ marginRight: 2 }}
              />
              <TextField
                label="Position"
                variant="outlined"
                value={experience.position}
                onChange={(e) => updateExperience(index, "position", e.target.value)}
                fullWidth
                required
              />
              <IconButton onClick={() => removeExperience(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px", paddingRight: "40px" }}>
              <TextField
                label="Start Date"
                variant="outlined"
                value={experience.startDate}
                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                fullWidth
                required
                sx={{ marginRight: 2 }}
              />
              <TextField
                label="End Date"
                variant="outlined"
                value={experience.endDate}
                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px", paddingRight: "40px" }}>
              <TextField
                label="Summary"
                variant="outlined"
                multiline
                rows={2}
                value={experience.summary}
                onChange={(e) => updateExperience(index, "summary", e.target.value)}
                fullWidth
                required
              />
            </Box>
          </Grid>
        ))}
        <Grid item>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            variant="contained"
            color="primary"
            onClick={addExperience}
          >
            Add Experience
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkExperiences;
