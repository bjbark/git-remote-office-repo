Ext.define('module.project.storeinfo.view.StoreInfoEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-storeinfo-editor' ,
	height : 272,

	layout : {
		type: 'border'
	},
	title : '매장 정보',
	collapsible : true,
	collapsed : true ,
	defaultFocus : 'hq_nm',
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this, item =
		{
	   	 	xtype : 'toolbar',
	   	 	dock  : 'bottom',
	   	 	items :
	   	 	[
	   	 	 	'->', '-',
	   	 	 	{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
	   	 	 	{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'}, '-'
	   	 	]
	   	};
		return item;
	},

	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this, item =
		{
			xtype : 'form-panel',
			dock : 'left',
			width : 330,
			bodyStyle: { padding: '5px' },
			fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
			items : [
		 	 	{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 		items : [
		 	 			{
		 	 				fieldLabel : '청약코드' ,
		 	 				name       : 'ctrl_id',
		 	 				xtype      : 'textfield'     ,
		 	 				readOnly   : true,
		 	 				fieldCls   : 'requiredindex',
		 	 				width      : 200
		 	 			},{
		 	 				name       : 'rqust_gb',
		 	 				xtype      : 'lookupfield',
		 	 				width      : 65,
		 	 				editable   : false,
		 	 				margin     : '0 0 0 5',
		 	 				fieldCls   : 'requiredindex',
		 	 				lookupValue : resource.lookup('rqust_gb' )
		 	 			},{
		 	 				name       : 'stor_gb',
		 	 				xtype      : 'lookupfield',
		 	 				width      : 40,
		 	 				margin     : '0 0 0 5',
		 	 				editable   : false  ,
		 	 				readOnly   : true,
		 	 				value		: '3',
		 	 				fieldCls   : 'readonlyfield',
		 	 				lookupValue : resource.lookup('stor_gb' )
		 	 			}
		 	 		]
		 	 	},{
		 	 		xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 		items : [
		 	 			{
		 	 				fieldLabel : '청약명칭' ,
		 	 				name       : 'ctrl_nm',
		 	 				emptyText : '공급사 내부 명칭',
		 	 				xtype      : 'textfield'     ,
		 	 				width      : 200
		 	 			},{
		 	 				name       : 'sys_clnt_reg_yn',
		 	 				xtype      : 'lookupfield',
		 	 				width      : 110,
		 	 				margin     : '0 0 0 5',
		 	 				editable   : false  ,
		 	 				lookupValue : [['0', '연동해지' ], ['1', '메인연동'] ]
		 	 			}
		 	 		]
		 	 	},{	fieldLabel : '실매장명' , name : 'stor_nm', xtype : 'textfield' , emptyText : '실매장의 사업장 명으로 표시되는 항목[변경주의]'


		 	 	},{	fieldLabel : '가맹점코드' , name : 'erp_chain', xtype : 'textfield', emptyText : '체인점 본사에서 가맹점을 식별하는 코드[연동코드]'

		 	 	},{	fieldLabel : '미납공지' , name : 'warn_msg', xtype : 'textfield', emptyText : '업데이트시 요금 미납 내용이 팝업으로 뜬다.'
		 	 	},{
		 	 		xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 		items : [
	 	 		 		{
	 	 		 			fieldLabel  : '초기ID/PW' ,
	 	 		 			xtype       : 'textfield'   ,
	 	 		 			name        : 'login_id'      ,
	 	 		 			width      : 200 ,
	 	 		 			readOnly  : true  ,
	 	 		 			fieldCls    : 'readonlyfield'
	 	 		 		},{
	 	 		 			name       : 'login_pwd',
	 	 		 			xtype      : 'textfield',
	 	 		 			width      : 110,
	 	 		 			margin     : '0 0 0 5',
	 	 		 			readOnly  : true  ,
	 	 		 			fieldCls    : 'readonlyfield'
	 	 		 		}
	 	 		 	]

		 	 	},{
		 	 		xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 		items : [
	 	 		 		{
	 	 		 			fieldLabel  : '관리ID/PW' ,
	 	 		 			xtype       : 'textfield'   ,
	 	 		 			name        : 'erp_id'      ,
	 	 		 			width      : 200

	 	 		 		},{
	 	 		 			name       : 'erp_pwd',
	 	 		 			xtype      : 'textfield',
	 	 		 			width      : 110,
	 	 		 			margin     : '0 0 0 5'
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
	createTabs : function () {
		var me = this, item =
		{
			xtype : 'tabpanel',
			region : 'center',
			margin : 0 ,
			plain: true,
			items: [ me.createTab1(),  me.createTab2(), me.createTabContents() , me.createTab3() ]
		};
		return item;
	},

	createTab1 : function() {
		var item = {
				title        : '사업자정보',
				layout       : 'vbox',
				border       : 0,
				bodyStyle    : { padding: '5px' },
				//region       : 'center',
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
						 		 	{ fieldLabel : '사업자명'   ,  name : 'biz_nm'      , xtype  : 'textfield'
						 		 	},{
							 			xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',  fieldDefaults: { labelWidth : 70, labelSeparator : '' },
							 	 		items : [
							 	 		 	{
							 	 		 		xtype  : 'textfield',  fieldLabel : '등록번호',	name : 'biz_no' , width : 185
							 	 		 	},{
							 	 		 		xtype  : 'button',  text : '양도양수' , width : 55 , margin : '0 0 0 5' , action : 'contrChange'
							 	 		 	}
							 	 		]
						 		 	},
						 		 	{ fieldLabel : '업태'      ,  name : 'biz_type'    , xtype  : 'textfield'  },
						 		 	{ fieldLabel : '업종'      ,  name : 'biz_kind'   , xtype  : 'textfield'   } ,
						 		 	{ fieldLabel : '대표자'     ,  name : 'biz_owner'  , xtype  : 'textfield'   },


						 	   ]
						 	},
						 	{	xtype        : 'form-panel',
						 		border       :   0,
						 		width        : 250,
						 		fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
						 		items : [
						 		    { fieldLabel : '사업자 구분'  ,  name : 'biz_gb'  	   , xtype  : 'lookupfield' , lookupValue   : resource.lookup('biz_gb') },

						 		    { fieldLabel : '계산서 메일'  ,  name : 'biz_email'   , xtype  : 'textfield'   , vtype : 'email'  },
						 		 	{ fieldLabel : '전화번호'    ,  name : 'biz_tel_no'  , xtype  : 'textfield'   , vtype : 'phone'  },
						 		 	{ fieldLabel : '팩스번호'    ,  name : 'biz_fax_no'  , xtype  : 'textfield'   , vtype : 'phone'  },
						 		 	{ fieldLabel : '휴대전화'    ,  name : 'biz_hp_no'  , xtype  : 'textfield'   , vtype : 'mobile'  }
                                ]
                            }
                        ]
                    },

					{   xtype        : 'panel',
						layout       : 'hbox',
						border       : 0,
						region       : 'center',
						margin       : '0 0 5 0',
						fieldDefaults: { labelWidth : 70, labelSeparator : '' },
						items        : [
						 	{
						 		fieldLabel : '우편번호',
						 		xtype      : 'popupfield',
								editable	: true,
								enableKeyEvents : true,
						 		name       : 'biz_zip_cd',
						 		pair       : 'biz_zip_id',
						 		allowBlank : true,
						 		clearable  : false ,
						 		editable   : true,
						 		vtype		 : 'zipcode',
						 		width : 150,
						 		labelWidth : 70,
						 		popup: {
						 			select : 'DAUM',
						 			widget : 'popup-zipcode-search',
						 			params : { },
						 			result : function(records, nameField, pairField){
						 				var panel   = nameField.up('form'),
						 					address = records[0].data
						 				;
						 				nameField.setValue( address.zip_cd );
						 				pairField.setValue( address.zip_cd );
						 				panel.down('[name=biz_state]' ).setValue( address.state );
						 				panel.down('[name=biz_city]'  ).setValue( address.city  );
						 				panel.down('[name=biz_dong]'  ).setValue( address.dong  );
						 				panel.down('[name=biz_addr_1]' ).setValue( address.addr_1 );
						 				panel.down('[name=biz_addr_2]' ).setValue( address.addr_2 );
						 				panel.down('[name=biz_addr_2]').focus(true , 10);
						 			}
						 		}
						 	},
						 	{ name : 'biz_addr_1' , xtype : 'textfield' , hidden : true }	,
						 	{ name : 'biz_zip_id', xtype : 'textfield' , hidden : true }	,
				 		 	{ name : 'biz_state' , width : 60 , xtype  : 'textfield' ,  margin : '0 0 0 5' },
				 		 	{ name : 'biz_city'  , width : 100, xtype  : 'textfield' ,  margin : '0 0 0 5' },
				 		 	{ name : 'biz_dong'  , width : 170, xtype  : 'textfield' ,  margin : '0 0 0 5' }

				 		]
				 	},
		 		 	{	fieldLabel : '상세주소', xtype: 'textfield', name: 'biz_addr_2',  width: 495  , labelWidth : 70 }

				]
			}
		;
		return item;
	},

	createTab2 : function() {
		var item =
		{
			title        : '사업장정보',
			layout       : 'vbox',
			border       : 0,
			bodyStyle    : { padding: '5px' },
			fieldDefaults: { labelWidth : 70, labelSeparator : '' },
			items        : [
			 	{
			 		xtype        : 'panel',
			 		layout       : 'hbox',
			 		border       : 0,
			 		region       : 'center',
			 		margin       : '0 0 5 0',
			 		fieldDefaults: { labelWidth : 70, labelSeparator : '' },
			 		items        : [
					 	{
					 		fieldLabel : '우편번호',
					 		xtype      : 'popupfield',
							editable	: true,
							enableKeyEvents : true,
					 		name       : 'zip_cd',
					 		pair       : 'zip_id',
					 		allowBlank : true,
					 		clearable  : false ,
					 		editable   : true,
					 		width : 150,
					 		labelWidth : 70,
					 		popup: {
					 			select : 'DAUM',
					 			widget : 'popup-zipcode-search',
					 			params : { },
					 			result : function(records, nameField, pairField){
					 				var panel   = nameField.up('form'),
						 				address = records[0].data
					 				;
					 				nameField.setValue( address.zip_cd );
					 				pairField.setValue( address.zip_cd );
					 				panel.down('[name=state]' ).setValue( address.state );
					 				panel.down('[name=city]'  ).setValue( address.city  );
					 				panel.down('[name=dong]'  ).setValue( address.dong  );
					 				panel.down('[name=addr_1]' ).setValue( address.addr_1 );
					 				panel.down('[name=addr_2]' ).setValue( address.addr_2 );
					 				panel.down('[name=addr_2]').focus(true , 10);
					 			}
					 		}
					 	},
					 	{ name : 'addr_1' , xtype : 'textfield' , hidden : true }	,
					 	{ name : 'zip_id', xtype : 'textfield' , hidden : true }	,
					 	{ name : 'state' , width : 60 , xtype  : 'textfield' , margin : '0 0 0 5' },
					 	{ name : 'city'  , width : 100, xtype  : 'textfield' , margin : '0 0 0 5' },
					 	{ name : 'dong'  , width : 170, xtype  : 'textfield' , margin : '0 0 0 5' }
					]
			 	},{
			 		fieldLabel : '상세주소', xtype: 'textfield', name: 'addr_2',  width: 495  , labelWidth : 70
			 	},{
			 		xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 		items : [
			 		 	{
			 		 		fieldLabel : '주소링크', xtype: 'textfield', name: 'map_url',  width: 440  , labelWidth : 70
			 		 	},{
			 		 		xtype           : 'button'   ,
			 		 		action          : 'mapAction',
			 		 		text            : '지도보기'  ,
			 		 		width          	: 53         ,
			 		 		margin          : '0 0 0 2'
			 		 	}
			 		]
			 	},{

			 		xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',  fieldDefaults: { labelWidth : 70, labelSeparator : '' },

		 	 		items : [
		 	 		 	{
		 	 		 		fieldLabel : '사업장코드',
		 	 		 		name : 'hq_grp' , width : 165 , xtype  : 'textfield' , readOnly  : true , fieldCls  : 'readonlyfield'
		 	 		 	},{
		 	 		 		name : 'hq_id'  , width : 90, xtype  : 'textfield' , readOnly  : true , fieldCls  : 'readonlyfield' , margin : '0 0 0 3'
		 	 		 	},{
		 	 		 		name : 'stor_grp'  , width : 115, xtype  : 'textfield' , readOnly  : true , fieldCls  : 'readonlyfield' , margin : '0 0 0 3'
		 	 		 	},{
		 	 		 		name : 'stor_id'  , width : 115, xtype  : 'textfield' , readOnly  : true , fieldCls  : 'readonlyfield' , margin : '0 0 0 3'
		 	 		 	}
		 	 		]
			 	}
			]
		};
		return item;
	},

	/**
	 * 메모사항
	 */
	createTabContents : function() {
		var me = this, item =
		{
			title	 : '계약내용',
			xtype 	 : 'form-panel' ,
			layout 	 : 'hbox',
			border 	 : 0 ,
			bodyStyle : { padding: '5px' },
			items	 : [
			 	{
			 		xtype : 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 		fieldDefaults: { labelWidth : 50, labelSeparator : '' },
			 		items : [
			 		 	{
	 	 		 			fieldLabel  : '청약일자' ,
	 	 		 			xtype       : 'datefield'   ,
	 	 		 			name        : 'rqust_dt'      ,
	 	 		 			allowBlank  : false         ,
	 	 		 			editable    : false ,
	 	 		 			width      	: 200 ,
	 	 		 			format      : Const.DATE_FORMAT_YMD_BAR,
	 	 		 			submitFormat: Const.DATE_FORMAT_YMD
	 	 		 		},{
	 	 		 			fieldLabel	: '청약상태',
	 	 		 			name		: 'rqust_sts',
	 	 		 			xtype		: 'lookupfield',
	 	 		 			width		: 200 ,
	 	 		 			editable	: false  ,
	 	 		 			lookupValue : resource.lookup('rqust_sts' )
	 	 		 		},{
			 		 		xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
			 		 		name		: 'distr_nm',
			 		 		pair		: 'chnl_id',
			 		 		fieldLabel	: '영업채널',
			 		 		clearable	: false,
			 		 		readOnly	: true ,
			 		 		fieldCls   : 'readonlyfield',
			 		 		width : 200,
			 		 		popup: {
			 		 			select : 'SINGLE',
			 		 			widget : 'lookup-agent-popup',
			 		 			params : { stor_grp : _global.stor_grp, row_sts : 0 },
			 		 			result :  function(records, nameField, pairField ){
			 		 				var me = this,
		 		 						ct = nameField.up('form')
		 		 					;
			 		 				nameField.setValue(records[0].get('distr_nm'));
			 		 				pairField.setValue(records[0].get('chnl_id'));
			 		 				ct.down('[name=mngt_chnl_nm]').setValue(records[0].get('mngt_chnl_nm'));
			 		 				ct.down('[name=agent_id]').setValue(records[0].get('agent_id'));
			 		 			}
			 		 		}
			 		 	},{
			 		 		xtype      : 'textfield', name: 'chnl_id', hidden:true
			 		 	},{
			 		 		xtype      : 'popupfield',
							editable	: true,
							enableKeyEvents : true,
			 		 		name       : 'mngt_chnl_nm',
			 		 		pair       : 'agent_id',
			 		 		fieldLabel : '관리채널',
			 		 		//allowBlank : false,
			 		 		clearable  : false,
			 		 		width : 200,
			 		 		popup: {
			 		 			select : 'SINGLE',
			 		 			widget : 'lookup-agent-popup',
			 		 			params : { stor_grp : _global.stor_grp, row_sts : 0 },
			 		 			result :  function(records, nameField, pairField ){
			 		 				var me = this,
			 		 					ct = nameField.up('form')
			 		 				;
			 		 				//console.debug( form );
			 		 				nameField.setValue(records[0].get('mngt_chnl_nm'));
			 		 				pairField.setValue(records[0].get('agent_id'));
			 		 				ct.down('[name=distr_nm]').setValue(records[0].get('distr_nm'));
			 		 				ct.down('[name=chnl_id]').setValue(records[0].get('chnl_id'));
			 		 			}
			 		 		}
			 		 	},{
			 		 		xtype      : 'textfield', name: 'agent_id', hidden:true
			 		 	},{
			 		 		xtype      : 'popupfield',
							editable	: true,
							enableKeyEvents : true,
			 		 		name       : 'phone_nm',
			 		 		pair       : 'call_cntr_id',
			 		 		fieldLabel : '콜센터',
			 		 		clearable  : false,
			 		 		width : 200,
			 		 		popup: {
			 		 			select : 'SINGLE',
			 		 			widget : 'lookup-phone-popup',
			 		 			params : { stor_grp : _global.stor_grp, row_sts : 0 },
			 		 			result :  function(records, nameField, pairField ){
			 		 				var me = this ;
			 		 				nameField.setValue(records[0].get('phone_nm'));
			 		 				pairField.setValue(records[0].get('call_cntr_id'));
			 		 			}
			 		 		}
			 		 	},{
			 		 		xtype      : 'textfield', name: 'call_cntr_id', hidden:true
			 		 	},{
			 		 		xtype      : 'popupfield',
							editable	: true,
							enableKeyEvents : true,
			 		 		name       : 'chrg_nm',
			 		 		pair       : 'chrg_id',
			 		 		fieldLabel : '매출고객',
			 		 		clearable  : false,
			 		 		width : 200,
			 		 		popup: {
			 		 			select : 'SINGLE',
			 		 			widget : 'lookup-charge-popup',
			 		 			params : { stor_grp : _global.stor_grp, row_sts : 0 },
			 		 			result :  function(records, nameField, pairField ){
			 		 				var me = this,
			 		 					ct = nameField.up('form')
			 		 				;
			 		 				nameField.setValue(records[0].get('chrg_nm'));
			 		 				pairField.setValue(records[0].get('chrg_id'));
			 		 				ct.down('[name=trns_sts]').setValue(records[0].get('trns_sts'));
			 		 				console.debug( records[0].get('trns_sts') );
			 		 				console.debug( ct.down('[name=trns_sts]') );

			 		 			}
			 		 		}
			 		 	},{
			 		 		xtype      : 'textfield', name: 'chrg_id', hidden:true
			 		 	},{
			 		 		xtype      : 'textfield', name: 'trns_sts', hidden:true
			 		 	}
			 		]
			 	},
			 	{
			 		name       : 'cont_cont' ,
			 		xtype      : 'textarea',
			 		height     : 187 ,
			 		flex       : 1    ,
			 		margin     : '0 0 0 5'
			 	}
			]
		};
		return item;
	},


	createTab3 : function() {
		var me = this, item =
		{
			title: '기타정보' ,
			xtype : 'form-panel' ,
			layout : 'vbox',
			border : 0 ,
			bodyStyle: { padding: '5px' },
			region : 'center',
			items : [
 		 		{
 		 			xtype        : 'panel',
 		 			layout       : 'hbox',
 		 			border       : 0,
 		 			items        : [
 		 		 		{
 		 		 			name : 'usr_memo' , fieldLabel : '메모사항' , xtype : 'textarea' ,height : 185
 		 		 		},{
 		 		 			xtype        : 'form-panel',
 		 		 			border       : 0,
 		 		 			width        : 170,
 		 		 			fieldDefaults: { width : 170, labelWidth : 70, labelSeparator : '' },
 		 		 			items : [
 		 		 			 	{ name : 'etax_ofr_id' ,  fieldLabel : 'TAX 업체' ,  xtype      : 'lookupfield', editable   : false, lookupValue : resource.lookup('tax_id') },
 		 		 			 	{ name : 'sms_ofr_id' ,  fieldLabel : 'SMS 업체' ,  xtype      : 'lookupfield', editable   : false, lookupValue : resource.lookup('sms_id') },
 		 		 			 	{ name : 'fax_ofr_id' ,  fieldLabel : 'FAX 업체' ,  xtype      : 'lookupfield', editable   : false, lookupValue : resource.lookup('fax_id') }
 		 		 			]
 		 		 		},{
 		 		 			xtype        : 'form-panel',
 		 		 			border       :   0,
 		 		 			width        : 170,
 		 		 			fieldDefaults: { width : 170, labelWidth : 70, labelSeparator : '' },
 		 		 			items : [
		 		 		 		{   name : 'etax_ofr_cd' , fieldLabel : 'TAX 코드' , xtype : 'textfield'  },
 		 		 		 		{   name : 'sms_ofr_cd' , fieldLabel : 'SMS 코드' , xtype : 'textfield'  },
		 		 		 		{   name : 'fax_ofr_cd' , fieldLabel : 'FAX 코드' , xtype : 'textfield'  }

 		 		 		 	]
 		 		 		},{
		 		 			xtype        : 'form-panel',
		 		 			border       :   0,
		 		 			width        : 170,
		 		 			fieldDefaults: { width : 170, labelWidth : 70, labelSeparator : '' },
		 		 			items : [
	 		 		 			{   name : 'etax_ofr_pwd' , fieldLabel : 'TAX 암호' , xtype : 'textfield'  },
		 		 		 		{   name : 'sms_ofr_pwd' , fieldLabel : 'SMS 암호' , xtype : 'textfield'  },
	 		 		 			{   name : 'fax_ofr_pwd' , fieldLabel : 'FAX 암호' , xtype : 'textfield'  }

		 		 		 	]
 		 		 		}
 		 		 	]
 		 		}
 		 	]
		};
		return item;
	}
});


