const getUsernameFromEmail = (email: string) => {
  const nameMatch = email.match(/^([^@]*)@/);
  return nameMatch ? nameMatch[1] : null;
}

export default getUsernameFromEmail;