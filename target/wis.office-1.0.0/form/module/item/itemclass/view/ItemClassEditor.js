Ext.define('module.item.itemclass.view.ItemClassEditor', {extend  : 'Axt.form.Editor',
	alias			: 'widget.module-itemclass-editor',
	height	:  _global.hq_id.toUpperCase() == 'N1000GPCPY'? 350 : 250,
	collapsible	: true,
	collapsed	: true ,
	defaultFocus: 'clss_nm',
	initComponent: function(config){
		var me			= this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var item = {
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls : 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls : 'button-style'}, '-'
				]
			};
		return item;
	},

	createWest : function () {
		var me = this,
			item = {
				xtype		: 'form-panel',
				dock		: 'left',
				width		: 330,
				bodyStyle	: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	xtype		: 'textfield',
								name		: 'clss_code',
								fieldLabel	: Language.get('clss_code','분류코드'),
								width		: 255 ,
								allowBlank	: false,
								fieldCls	: 'requiredindex'
							},{	name		: 'line_stat',
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							}
						]
					},{	xtype: 'textfield'	, name : 'clss_name'	, fieldLabel : Language.get('clss_name','분류명'),
					},{	xtype: 'textarea'	, name : 'user_memo'	, fieldLabel : Language.get('user_memo', '메모사항')  , height	:  _global.hq_id.toUpperCase() == 'N1000GPCPY'? 225 : 130,
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
				region	: 'center',
				hidden : _global.hq_id.toUpperCase()!='N1000GPCPY'  ? true:false,
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(),me.createTab2()]
			}
		;
		return item;
	},

	createTab1	: function() {
		var me	= this,
		item = {
			title	: '이미지',
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
										url		: 'system/item/itemmast/set/fileUpload.do',
										timeout	: 120000,
										method	: 'POST',
										layout	: { type: 'vbox', align: 'stretch' } ,
										padding	: 10 ,
										layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
										items	:[
											{	xtype		: 'filefield',
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
														}Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
													}
												}
											},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
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
														}Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
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
						margin	: '0 0 0 45',
						autoscroll : true,
						items : [
							{	xtype	: 'image',
								name	: 'image',
								id		: '',
								src		: '',
								width	: 195,
								height	: 260,
								margin	: '20 55',
								hidden	: false
							},{	xtype	: 'image',
								name	: 'image2',
								id		: '',
								src		: '',
								width	: 195,
								height	: 260,
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
		form.down('[name=item_imge]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=item_imge2]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	createTab2	: function() {
		var me	= this,
		item	= {
			title			: Language.get('full_addr','단가정보'),
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 500,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 10 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '무색코팅' ),
									name		: 'nocl_cotn_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '메탈와이어' ),
									name		: 'mtrl_wire_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '광택코팅' ),
									name		: 'vosh_cotn_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '투명와이어' ),
									name		: 'limp_wire_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '엠보싱' ),
									name		: '',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '바인터' ),
									name		: ''  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '무광' ),
									name		: '',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '소프트커버무선' ),
									name		: ''  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '유광' ),
									name		: 'sprt_colr_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '소프트커버펼침' ),
									name		: 'dprt_colr_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
			items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '책받침' ),
									name		: 'sprt_colr_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '떡제본' ),
									name		: 'dprt_colr_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
			items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '타공' ),
									name		: 'sprt_colr_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '평철' ),
									name		: 'dprt_colr_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
			items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '무선제본' ),
									name		: 'sprt_colr_pric',
									xtype		: 'numericfield',


									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '반짝' ),
									name		: 'dprt_colr_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 5 0 20',
									width		: 180,
									labelWidth	: 90,
								}
							]
						},
					]
				}
			]
		}
		;
		return item;
	}
});






