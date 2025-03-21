Ext.define('module.project.bonsainfo.view.BonsaInfoEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-bonsainfo-editor',
	height : 254,
	layout : {
		type: 'border'
	},
	title		: '연동 정보',
	collapsible : true,
	collapsed	: true ,
	defaultFocus: 'hq_nm',
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
	   	 	xtype : 'toolbar',
	   	 	dock: 'bottom',
	   	 	items: [
//	   	 	 	{ text: '로고 이미지 업로드', iconCls: Const.UPDATE.icon      , action : Const.UPLOAD.action }, //'uploadAction'
	   	 	 	{ text: '서버 데이터 동기화', iconCls: Const.UPDATE.icon      , action : 'synchronizer' },'-',
	   	 	 	'->', '-',
	   	 	 	{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
	   	 	 	{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
	   	 	]
	   	};
		return item;
	},

	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this,
			item = {
				xtype : 'form-panel',
				dock : 'left',
				width : 330,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				items :[
			 	 	{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 	 		items : [
			 	 			{	fieldLabel : '본사코드' ,
			 	 				name       : 'hq_id',
			 	 				xtype      : 'textfield',
			 	 				readOnly   : true,
			 	 				fieldCls   : 'requiredindex',
			 	 				width      : 185
			 	 			},{ fieldLabel : '구분',
			 	 				name       : 'hq_gb',
			 	 				xtype      : 'lookupfield',
			 	 				width      : 130,
			 	 				editable   : false,
			 	 				labelWidth : 30,
			 	 				fieldCls   : 'requiredindex',
			 	 				lookupValue : resource.lookup('hq_gb' )
			 	 			}
			 	 		]
			 	 	},{ xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 	 		items : [
	 	 		 			{	fieldLabel  : '청약일자' ,
	 	 		 				xtype       : 'datefield',
	 	 		 				name        : 'hq_reg_dt',
	 	 		 				readOnly	: true,
	 	 		 				allowBlank  : false,
	 	 		 				editable    : false,
	 	 		 				width		: 185 ,
	 	 		 				fieldCls	: 'readonlyfield',
	 	 		 				format      : Const.DATE_FORMAT_YMD_BAR,
	 	 		 				submitFormat: Const.DATE_FORMAT_YMD
	 	 		 			},{ fieldLabel	: '상태',
	 	 		 				name		: 'hq_sts',
	 	 		 				xtype		: 'lookupfield',
	 	 		 				readOnly	: true,
	 	 		 				width		: 130,
	 	 		 				labelWidth	: 30,
	 	 		 				fieldCls	: 'readonlyfield',
	 	 		 				editable	: false  ,
	 	 		 				lookupValue : resource.lookup('ctrl_sts' ) //   ControlUtil.values.ContractStatus
	 	 		 			}
	 	 		 		]
			 	 	},{	fieldLabel : '본사이름' , name : 'hq_nm', xtype : 'textfield'
			 	 	//},{	fieldLabel : '본사구분' , name : 'hq_gb', xtype : 'lookupfield' , lookupValue : resource.lookup( 'hq_gb')
			 	 	}
			 	]
			};// , me.createTabs()
			return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			item = {
			xtype	: 'tabpanel',
			region	: 'center',
			margin	: 0 ,
			plain	: true,
			items	: [ me.createTab1(), me.createTab2() ]//  , me.createTab2()
		};
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
	 		title	: '기타정보' ,
	 		xtype	: 'form-panel' ,
	 		layout	: 'vbox',
	 		border	: 0 ,
	 		bodyStyle: { padding: '5px' },
	 		region	: 'center',
	 		items	: [
	 		 	{	xtype	: 'panel',
	 		 		layout	: 'hbox',
	 		 		border	: 0,
	 		 		items	: [
	 		 		 	{	name		: 'usr_memo' ,
	 		 		 		fieldLabel	: '메모사항' ,
	 		 		 		xtype		: 'textarea' ,
	 		 		 		height		: 160 ,
	 		 		 		readOnly	: false
	 		 		 	},{	xtype		: 'form-panel',
	 		 		 		border		: 0,
	 		 		 		width		: 170,
	 		 		 		fieldDefaults: { width : 170, labelWidth : 70, labelSeparator : '' },
	 		 		 		items		: [
		 		 			 	{	name		: 'hq_sms_id' ,
		 		 			 		fieldLabel	: 'SMS 업체' ,
		 		 			 		xtype		: 'lookupfield',
		 		 			 		editable	: false,
		 		 			 		lookupValue	: resource.lookup('sms_id')
	 		 			 		},{ name		: 'bonsa_fax_id' ,
	 		 			 			fieldLabel	: 'FAX 업체' ,
	 		 			 			xtype		: 'lookupfield',
	 		 			 			editable	: false,
	 		 			 			lookupValue : resource.lookup('fax_id')
 		 			 			}
	 		 		 		]
	 		 		 	},{	xtype        : 'form-panel',
	 		 		 		border       :   0,
	 		 		 		width        : 170,
	 		 		 		fieldDefaults: { width : 170, labelWidth : 70, labelSeparator : '' },
	 		 		 		items :[
		 		 		 		{   name		: 'hq_sms_cd' ,
		 		 		 			fieldLabel	: 'SMS 코드' ,
		 		 		 			xtype		: 'textfield'
	 		 		 			},{	name		: 'bonsa_fax_cd' ,
	 		 		 				fieldLabel	: 'FAX 코드' ,
	 		 		 				xtype		: 'textfield'
 		 		 				}

	 		 		 		]
	 		 		 	},{	xtype        : 'form-panel',
	 		 		 		border       :   0,
	 		 		 		width        : 170,
	 		 		 		fieldDefaults: { width : 170, labelWidth : 70, labelSeparator : '' },
	 		 		 		items : [
		 		 		 		{   name		: 'bonsa_sms_pw' ,
		 		 		 			fieldLabel	: 'SMS 암호' ,
		 		 		 			xtype		: 'textfield'
	 		 		 			},{	name		: 'bonsa_fax_pw' ,
	 		 		 				fieldLabel	: 'FAX 암호' ,
	 		 		 				xtype		: 'textfield'
 		 		 				}
	 		 		 		]
	 		 		 	}
	 		 		]
	 		 	}
	 		]
	 	};
		return item;
	},

	/**
	 *
	 */
	createTab2 : function() {
		var item = {
			title        : '연동정보',
			layout       : 'vbox',
			border       : 0,
			bodyStyle    : { padding: '5px' },
			fieldDefaults: { labelWidth : 70, labelSeparator : '' },
			items        : [
				{	xtype        : 'panel',
					layout       : 'hbox',
					border       : 0,
					items        : [
					 	{	xtype        : 'form-panel',
					 		border       : 0,
					 		width        : 250,
					 	    fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
					 		items : [
					 		 	{   name : 'epo_db_id' , fieldLabel : '수발주 서버' , xtype : 'textfield'   //, fieldStyle: 'text-transform:uppercase'
					 			},{	name : 'hq_nts_id' , fieldLabel : '계산서 서버' , xtype : 'textfield'  //, fieldStyle: 'text-transform:uppercase'
								},{	name : 'hq_pos_id' , fieldLabel : '포스용 서버' , xtype : 'textfield'   //, fieldStyle: 'text-transform:uppercase'
								},{	name : 'hq_sms_id' , fieldLabel : '문자용 서버' , xtype : 'textfield'   //, fieldStyle: 'text-transform:uppercase'
								}
					 		]
					 	},{	xtype        : 'form-panel',
					 		border       :   0,
					 		width        : 250,
					 		fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
					 		items : [
					 		 	{	fieldLabel  : '구서버 연동' ,
					 		 		name        : 'old_inf_yn' ,
					 		 		xtype       : 'lookupfield',
					 		 		editable    : false,
					 		 		lookupValue :  [['0', '연동한함' ], ['1', '연동처리' ] ]
					 		 	},{	fieldLabel  : 'ERP 연동',
					 		 		name        : 'erp_inf_yn' ,
					 		 		xtype       : 'lookupfield',
					 		 		editable    : false,
					 		 		lookupValue :  [['0', '연동한함' ], ['1', '연동처리' ] ]
					 		 	},{ fieldLabel  : '온라인 연동' ,
					 		 		name        : 'web_inf_yn' ,
					 		 		xtype       : 'lookupfield',
					 		 		editable    : false,
					 		 		lookupValue :  [['0', '연동한함' ], ['1', '연동처리' ] ]

					 		 	},{	fieldLabel	: '품목 수신',
					 		 		name		: 'itm_rcpt_yn',
					 		 		xtype		: 'lookupfield',
					 		 		editable	: false,
					 		 		lookupValue :  [['0', '수신안함' ], ['1', '즉시수신' ], ['2', '수신보류' ]  ]
					 		 	}
                            ]
                        }
                    ]
                }
			]
		}
		;
		return item;
	}

});


