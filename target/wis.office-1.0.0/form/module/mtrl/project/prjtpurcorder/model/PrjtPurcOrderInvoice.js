Ext.define( 'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderInvoice', {
	extend: 'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
