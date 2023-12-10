export default class Result {

  public static readonly Success = () => { return { isSuccess: true } }
  public static readonly Failure = () => { return { isSuccess: false } }

  isSuccess: boolean

  constructor(isSuccess: boolean) {
    this.isSuccess = isSuccess
  }
}
