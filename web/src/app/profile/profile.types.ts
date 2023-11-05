type JobExperience = {
  companyName: string,
  position: string,
  startDate: Date,
  endDate: Date,
  description: string,
}

type Education = {
  schoolName: string,
  degree: string,
  startDate: Date,
  endDate: Date,
  description: string,
}

type Courses = {
  name: string,
  description: string,
  url: string,
}

export type UserProfile = {
  displayName: string,
  summary: string,
  skills: string[],
  // jobExperiences: JobExperience[],
  // education: Education[],
  // courses: Courses[],
}

export type Avatar = {
  file?: File,
  url: string
}

