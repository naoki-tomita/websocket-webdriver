export function btoa(str: string) {
  const buffer = new Buffer(str.toString(), 'binary');
  return buffer.toString('base64');
};

export function atob(str: string) {
  return new Buffer(str, 'base64').toString('binary');
}
