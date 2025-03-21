Ext.define('module.custom.kortc.sale.order.sordermast.view.SorderMastListerDetail3', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-sordermast-lister-detail3'			,
	store		: 'module.custom.kortc.sale.order.sordermast.store.SorderMastDetail3'	,


	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest() ] ;
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style', itemId: 'imgUpdate', hidden:true },
				{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style', itemId: 'imgCancel', hidden:true }, '-'
				]
			}
		;
		return item;
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
							width	: 3000,
							margin	: '5 0 0 0',
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									itemId	: 'imgSelect',
									hidden	: true,
									items		: [
										{	xtype	: 'form-panel',
											name	: 'uploadForm',
											region	: 'center',
											standardSubmit: false,
											border	:  false,
											url		: '/system/custom/kortc/sale/order/sordermast/set/fileUpload.do',
											timeout	: 120000,
											method	: 'POST',
											layout	: { type: 'vbox', align: 'stretch' } ,
											padding	: 10 ,
											layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
											items	:[
										{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
										},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
//												{    xtype : 'textfield',
//												    name  : 'imge_chek1',
////												    value : 'Y',
//												    hidden: false,
//												    listeners	: {
//														change:function(val){
//															if(val.getValue()){
//																img = new Uint8Array(val.getValue().split(","));
//																blob = new Blob([img],{type:'image/png'})
//																url = URL.createObjectURL(blob);
//																this.up('form').down('[name=image]').setSrc(url);
//															}else{
//																this.up('form').down('[name=image]').setSrc('');
//															}
//														}
//													}
//										     }, {    xtype : 'textfield',
//												    name  : 'imge_chek2',
////												    value : 'Y',
//												    hidden: false,
//												    listeners	: {
//														change:function(val){
//															if(val.getValue()){
//																img = new Uint8Array(val.getValue().split(","));
//																blob = new Blob([img],{type:'image/png'})
//																url = URL.createObjectURL(blob);
//																this.up('form').down('[name=image2]').setSrc(url);
//															}else{
//																this.up('form').down('[name=image2]').setSrc('');
//															}
//														}
//													}
//										     }
										},{    xtype : 'textfield',
												    name  : 'item_idcd',
												    hidden: true
										     },{	xtype		: 'filefield',
													name		: 'files',
													fieldLabel	: '이미지1',
													itemId		: 'files1',
													msgTarget	: 'side',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
													buttonText	: '선택',
													regex		: new RegExp('\.(jpg|gif|png|jpeg)', 'i'), // 확장자 제한 정규식
													listeners	: {
														change	: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek1]').setValue('Y');
																	form.down('[name=image]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle,margin:'1 0 0 0',
												},{	xtype		: 'filefield',
													name		: 'files',
													fieldLabel	: '이미지2',
													msgTarget	: 'side',
													itemId		: 'files2',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
													buttonText	: '선택',
													regex		: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners	: {
														change	: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader()
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek2]').setValue('Y');
																	form.down('[name=image2]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek2]').setValue('');
																form.down('[name=image2]').setSrc('');
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2,margin:'1 0 0 0',
												},{xtype:'hiddenfield', name:'param', value:''
												},{xtype:'hiddenfield', name:'token', value:_global.token_id }
											]
										}
									]
								}
							]
						},{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 0 45',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									id		: 'item_imge',
									src		: '',
									width	: 195,
									height	: 220,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									id		: 'item_imge2',
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
						},{	xtype		:'textfield',
							name		: 'invc_numb',
							hidden		: true,
						},{	xtype		:'textfield',
							name		: 'amnd_degr',
							hidden		: true,
						},{	xtype		:'textfield',
							name		: 'line_seqn',
							hidden		: true,
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