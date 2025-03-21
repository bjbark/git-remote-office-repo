Ext.define( 'module.mtrl.po.poisttwork.model.PoIsttWorkInvoice', {
	extend: 'module.mtrl.po.poisttwork.model.PoIsttWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.mtrl.po.poisttwork.model.PoIsttWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
