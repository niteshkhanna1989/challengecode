var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var ProvidersSchema = new Schema({
  DRGDefinition: String,
  ProviderId: Number,
  ProviderName: String,
  ProviderStreetAddress: String,
  ProviderCity: String,
  ProviderState: String,
  ProviderZipCode: Number,
  HospitalReferralRegionDescription: String,
  AverageCoveredCharges: Number,
  AverageTotalPayments: Number,
  AverageMedicarePayments: Number,
  TotalDischarges: Number
});
ProvidersSchema.plugin(mongoosePaginate);
mongoose.model('patientproviders', ProvidersSchema);

module.exports = mongoose.model('patientproviders');