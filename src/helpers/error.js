export const errors = (message) => {

  if(message.trim() === 'Firebase: Error (auth/invalid-email).' || 'Firebase: Error (auth/wrong-password).') {
    return 'Email o Password incorrectos';
  }
  if(message.trim() === 'Firebase: Error (auth/internal-error).'){
    return 'Ingresa un Password';
  }
  if(message.trim() === 'Firebase: Error (auth/internal-error).'){
    return 'Ingresa un Password';
  }
  if(message.trim() === 'Firebase: Error (auth/popup-closed-by-user).'){
    return 'Hubo algun problema :('; 
  }

}