Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanListerDetail3', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-porderplan-lister-detail3'			,


	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
		item = {
				name	: 'imge_info',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				layout	: 'vbox',
				autoScroll:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 0 45',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									id		: 'prjt_work_imge',
									src		: '',
									width	: 195,
									height	: 220,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									id		: 'prjt_work_imge2',
									src		: '',
									width	: 195,
									height	: 220,
									margin	: '20 55 0 160',
									hidden	: false
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
	},

	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=imge_1fst]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=imge_2snd]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
});