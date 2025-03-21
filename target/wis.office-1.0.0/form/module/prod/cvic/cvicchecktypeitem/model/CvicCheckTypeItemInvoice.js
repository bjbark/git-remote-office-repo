Ext.define( 'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemInvoice', {
	extend: 'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
