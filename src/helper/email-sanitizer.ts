export class EmailSanitizer {
  static normalizeEmail(eMail: string) {
    if (typeof eMail !== 'string' || eMail === '')
      throw new Error('INVALID_EMAIL');
    const email = eMail.toLowerCase();
    const emailParts = email.split(/@/);
    if (emailParts.length !== 2) throw new Error('INVALID_EMAIL');
    return email;
  }
}
