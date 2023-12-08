export type WorkExperience = {
  companyName: string,
  position: string,
  startDate: string,
  endDate: string,
  summary: string,
}

export type Education = {
  schoolName: string,
  degree: string,
  startDate: Date,
  endDate: Date,
  description: string,
}

export type Courses = {
  name: string,
  description: string,
  url: string,
}

export type UserProfile = {
  displayName: string,
  summary: string,
  skills: string[],
  linkedinUrl: string,
  workExperiences: WorkExperience[],
  // education: Education[],
  // courses: Courses[],
}

export type Avatar = {
  file?: File,
  url: string
}

