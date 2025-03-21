Ext.define('module.design.project.stndbomwork.view.StndBomWorkFinder2', { extend: 'Axt.form.Editor',

	alias: 'widget.module-stndbomwork-finder2',

	layout : {
		type: 'border'
	},

	collapsible 	: false	,
	collapsed		: false	,
	defaultFocus	: 'pjod_code',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock()];
		me.items = [me.createTab()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' }
				]
			}
		;
		return item;
	},

	createTab : function() {
		var me = this,
			item = {
				title	: '이미지',
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
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	xtype	: 'form-panel',
											name	: 'uploadForm',
											region	: 'center',
											standardSubmit: false,
											border	:  false,
											url		: 'system/design/bomwork/set/setImage.do',
											timeout	: 120000,
											method	: 'POST',
											layout	: { type: 'vbox', align: 'stretch' } ,
											padding	: 10 ,
											layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
											items	: [
												{	xtype       : 'filefield',
													name        : 'files',
													fieldLabel  : '이미지1',
													msgTarget   : 'side',
													allowBlank  : true,
													clearable	: true ,
													anchor      : '100%',
													margin		: '0 3 0 0 ',
													width       : 350,
													buttonText  : '선택',
													regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners: {
														change: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	form.down('[name=image]').setSrc(event.target.result)
																	form.down('[name=imge_chek1]').setValue('Y');
//																	Ext.get('prjt_work_imge').dom.src = event.target.result;
																});
																reader.readAsDataURL(file);
															}else{
																form.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
												},{	xtype       : 'filefield',
													name        : 'files',
													fieldLabel  : '이미지2',
													msgTarget   : 'side',
													allowBlank  : true,
													clearable	: true ,
													anchor      : '100%',
													margin		: '0 3 0 0 ',
													width       : 350,
													buttonText  : '선택',
													regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners: {
														change: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader()
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	form.down('[name=image2]').setSrc(event.target.result);
																	form.down('[name=imge_chek2]').setValue('Y');
																});
																reader.readAsDataURL(file);
															}else{
																form.down('[name=imge_chek2]').setValue('');
																form.down('[name=image2]').setSrc('');
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2
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
							name		: 'imge_1fst',
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
							name		: 'imge_2snd',
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
		var form = this.up('form').up('[title=이미지]');
		form.down('[name=image]').setSrc('');
		form.down('[name=imge_1fst]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('form').up('[title=이미지]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=imge_2snd]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	}
});