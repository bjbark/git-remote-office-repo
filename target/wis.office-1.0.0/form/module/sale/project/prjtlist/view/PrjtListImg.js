Ext.define('module.sale.project.prjtlist.view.PrjtListImg', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prjtlist-img',

	layout : {
		type: 'border'
	},

	collapsible 	: false	,
	collapsed		: false	,
	defaultFocus	: 'pjod_code',

	initComponent: function(config){
		var me = this;
		me.items = [me.createTab()];
		me.callParent(arguments)  ;
	},

	createTab : function() {
		var me = this,
			item = {
				name	: 'imge_info',
				xtype	: 'form-panel',
				dock	:'left',
				autoScroll:true,
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									src		: '',
									width	: 300,
									height	: 200,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									src		: '',
									width	: 300,
									height	: 200,
									margin	: '20 55',
									hidden	: false
								},{xtype : 'textfield', name : 'imge_chek1', hidden:true
								},{xtype : 'textfield', name : 'imge_chek2', hidden:true
								}
							]
						},{	xtype		:'textfield',
							name		: 'item_imge',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'item_imge2',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image2]').setSrc(url);
									}else{
										this.up('form').down('[name=image2]').setSrc('');
									}
								}
							}
						}
					]
				}
			;
		return item;
	}
});