Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastEditor', { extend: 'Axt.form.Editor',

	alias		: 'widget.module-fabcmast-editor',
	height : 340,
	layout : {
		type: 'border'
	},

	title			: Language.get('','원단코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'fabc_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 310,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 500, labelWidth : 70, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '15 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('fabc_code','원단코드'),
								name		: 'fabc_code',
								xtype		: 'textfield',
								allowBlank	: false,
								width		: 190
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 70,
								margin		: '0 0 0 5'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('fabc_name','원단명'),
								xtype		: 'textfield',
								name		: 'fabc_name',
								width		: 265
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('ppln_dvcd','지골'),
								xtype		: 'lookupfield',
								name		: 'ppln_dvcd',
								lookupValue	: resource.lookup('line_dvcd'),
								width		: 265,
								editable	: false
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('ppkd_dvcd','지종'),
								xtype		: 'lookupfield',
								name		: 'ppkd_dvcd',
								lookupValue	: resource.lookup('ppkd_dvcd'),
								width		: 265,
								editable	: false
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('ppsg_dvcd','단종'),
								xtype		: 'lookupfield',
								name		: 'ppsg_dvcd',
								lookupValue	: resource.lookup('ppsg_dvcd'),
								width		: 265,
								editable	: false
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('','표준단가/m2'),
								xtype		: 'numericfield',
								name		: 'stnd_pric',
								width		: 265,
							}
						]
					},{	name : 'fabc_idcd', xtype	: 'textfield', hidden : true
					},{	name : 'change', xtype : 'textfield' , hidden : true
					},{	name : 'modify', xtype : 'textfield' , hidden : true
					},{	name : 'imge_chek1' , xtype : 'textfield', hidden : true
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center'	,
				margin	: 0	,
				plain	: true,
				items	: [ me.createTab2(), me.createTab3(),me.createTab1()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
		item = {
			title		: '이미지',
			name		: 'imge_info',
			xtype		: 'form-panel',
			dock		:'left',
			region		: 'center',
			layout		: 'vbox',
			border		: 0,
			autoScroll		:true,
			fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
				items	: [
					{	xtype 	: 'panel',
						layout	: 'hbox',
						border	: 0,
						autoscroll : true,
						items 	: [
							{	xtype	: 'image',
								name	: 'image',
								src		: "",
								width	: 400,
								height	: 230,
								alt		: '이미지가 없습니다.',
								margin	: '20 5 0 20',
								listeners:{
									render:function(field,b,c){
										if(field.src == ""){
											field.setSrc('unknown');
//											field.setSrc(_global.location.href+"/resource/img/no_image.png");
										}
									}
								}
							},{	xtype			: 'form-panel',
								border			: 0,
								margin	: '20 0 0 0',
								items			: [
									{	xtype	: 'form-panel',
										name	: 'uploadForm',
										region	: 'center',
										standardSubmit: false,
										border	:  false,
										url		: 'system/upload/set/modifyUpload.do',
										timeout	: 120000,
										method	: 'POST',
										layout		: { type: 'vbox', align: 'stretch' } ,
										padding	: 10 ,
										layout		: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
										items		:[
											{	xtype			: 'filefield',
												name			: 'files',
												itemId			: 'files1',
												buttonOnly		: true,
												buttonText		: '이미지불러오기',
												regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
												listeners		: {
													change		: function (field) {
														var file = field.fileInputEl.dom.files[0],
															reader = new FileReader(),
															form = this.up('form').up('form').up('panel').up('form')
														;
														if (file) {
															reader.addEventListener('load', function (event) {
																me.down('[name=imge_chek1]').setValue('Y');
																me.down('[name=change]').setValue('Y');
																form.down('[name=image]').setSrc(event.target.result);
																var printspec = Ext.ComponentQuery.query('lookup-printspec-common')[0];
																printspec.down('[name=center]').setSrc(event.target.result);
															});
															reader.readAsDataURL(file);
														}
													},
												},
											},{xtype:'hiddenfield', name:'param', value:''
											},{xtype:'hiddenfield', name:'token', value:_global.token_id }
										]
									}
								]
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
					},{	xtype 	: 'panel',
						layout	: 'hbox',
						margin	: '5 0 0 0',
						border	: 0,
						items	: [

						]
					/* 이미지를 보여줄 panel */
					},
				]
			}
		;
		return item;
	},

	createTab2 : function() {
		var me		= this;
		var item	=
			{	title	: Language.get( '' , '배합구성표'),
				xtype	: 'module-fabcmast-bomlister',
			};
		return item;
	},


	createTab3 : function() {
		var me		= this;
		var item	=
			{	title	: Language.get( '' , '매입처별 단가'),
				xtype	: 'module-fabcmast-priclister',
			};
		return item;
	},



});