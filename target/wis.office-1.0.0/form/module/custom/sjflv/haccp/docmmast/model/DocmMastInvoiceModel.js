Ext.define( 'module.custom.sjflv.haccp.docmmast.model.DocmMastInvoiceModel', {
	extend		: 'module.custom.sjflv.haccp.docmmast.model.DocmMastModel1',
	associations: [{
		type	: 'hasMany',
		model	: 'module.custom.sjflv.haccp.docmmast.model.DocmDetailModel1',
		associationKey: 'product',
		name	: 'product'
	}]
});
