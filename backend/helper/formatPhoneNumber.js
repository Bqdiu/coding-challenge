export default function formatPhoneNumber(phone) {
  if (phone.startsWith('0')) {
    return '+84' + phone.substring(1);
  } else if (phone.startsWith('84')) {
    return '+84' + phone.substring(2);
  }
  return phone;
}
