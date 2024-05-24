import { CreateBusinessInterface } from "../../Interfaces/businessinterface";

const BusinessInformationBreakDown = (data: CreateBusinessInterface) => {
  delete data.tenantId;
  delete data.providerData;
  delete data.isAnonymous;
  delete data.emailVerified;
  delete data.displayName;

  return data;
};
export default BusinessInformationBreakDown;
