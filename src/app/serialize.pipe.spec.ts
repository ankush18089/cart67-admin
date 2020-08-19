import { SerializePipe } from './serialize.pipe';

describe('SerializePipe', () => {
  it('create an instance', () => {
    const pipe = new SerializePipe();
    expect(pipe).toBeTruthy();
  });
});
