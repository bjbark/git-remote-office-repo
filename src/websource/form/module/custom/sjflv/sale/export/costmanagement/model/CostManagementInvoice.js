Ext.define( 'module.custom.sjflv.sale.export.costmanagement.model.CostManagementInvoice', {
	extend: 'module.custom.sjflv.sale.export.costmanagement.model.CostManagementWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.costmanagement.model.CostManagementWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});