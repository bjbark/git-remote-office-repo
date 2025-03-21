Ext.define('module.sale.salework.view.SaleWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-salework-worker-editor',

	height : 220,
	title  : '매출 등록',
	header : false,

	getStore : function() {
		return Ext.getStore( 'module.sale.salework.store.SaleWorkInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	/**
	 *
	 */
	createWest : function () {
		var item = {
			xtype        : 'form-panel' ,
			dock         : 'left'       ,
			border       : 0            ,
			bodyStyle    : { padding: '5px' },
			width        : 400          ,
			fieldDefaults: { width : 320, labelWidth : 70, labelSeparator : '' },
			items        : [
				{   xtype   : 'fieldset',
					layout  : 'hbox',
					border  : 0,
	 	 			padding : '0'       ,
	 	 			margin  : '0 0 5 0' ,
					items   : [
					    {	fieldLabel : Language.get('cust_name', '거래처명' ),
					    	name       : 'cust_name',
					 		pair       : 'cust_idcd',
					 		xtype      : 'popupfield',
					 		editable	: true,
							enableKeyEvents : true,
//					 		labelWidth : 50,
						  	width      : 210,
						  	readOnly   : true,
					 		allowBlank : false,
					 		fieldCls   : 'readonlyfield',
						  	emptyText  : Const.invalid.emptyValue ,
					 		clearable  : false,
					 	    popup      : {
					 			widget : 'module-cust-popup',
					 			select : 'SINGLE',
					 			params : { stor_id : _global.stor_id },
					 		    result : function(records, nameField, pairField ){
					 		    	nameField.setValue(records[0].get('cust_name'));
					 		    	pairField.setValue(records[0].get('cust_idcd'));
					 		    }
							}
					    },
						{   name        : 'chnl'   ,
							xtype       : 'lookupfield'  ,
							fieldLabel  : Language.get('inv_work_nm',   '관리채널'),
					 		editable    : false,
					 		readOnly    : true ,
					 		width       : 170,
//					 		margin      :'0 0 0 5',
					 		fieldCls    : 'readonlyfield',
					 		lookupValue : resource.lookup('sale_ch') ,
					 		value       : '2'
						},
					    {   xtype   : 'textfield' , name : 'cust_idcd' , hidden : true }
					]
				},
				{   xtype   : 'fieldset',
				    layout  : 'hbox',
				    border  : 0,
	 	 			padding : '0'       ,
	 	 			margin  : '0 0 5 0' ,
				    items   : [
			 		    {	fieldLabel : Language.get('', '회원명' ),
			 				name       : 'mmb_nm',
			 				pair       : 'mmb_id',
			 				xtype      : 'popupfield',
			 				editable	: true,
							enableKeyEvents : true,
				  	        width      : 210,
				  	        //readOnly   : true,
			 				allowBlank : false,
			 				//fieldCls   : 'readonlyfield',
				  	        emptyText  : Const.invalid.emptyValue ,
			 			    clearable  : false,
			 				popup      : {
			 					widget : 'lookup-memb-popup',
			 					select : 'SINGLE',
			 					params : { stor_id : _global.stor_id },
			 					//apiurl : {
			 					//	search : _global.api_host_info + '/system/cust/custstore/get/dialogmemb.do',
			 					//	master : _global.api_host_info + '/system/cust/custstore/get/master.do'
			 					//},
			 		    		result : function(records, nameField, pairField ){
			 		    			nameField.setValue(records[0].get('mmb_nm'));
			 		    			pairField.setValue(records[0].get('mmb_id'));
			 		    		}
			 				}
			 		    },
						{   name        : 'tax_type'   ,
							xtype       : 'lookupfield'  ,
							fieldLabel  : '세액계산',
			 		        editable    : false,
			 		        width       : 170,
//			 		        margin      :'0 0 0 5',
			 		        lookupValue : resource.lookup('tax_type'),
			 		        listeners: {
			 		        	select: function(self, records, index) {
			 		        		var base = self.up('form').ownerCt,
			 		        			data = base.getForm().getValues(),
			 		        			info = base.getForm().getRecord()
			 		        		;

			 		        		if (info && data) {
			 		        			info.set('tax_type' , data.tax_type );
				 		        		info.product().data.each( function( item ) {
				 		        			item.recalculation( info );
				 		        		});
			 		        		}
			 		        	}
			 		        }
						},
			 		    {   xtype : 'textfield' , name : 'mmb_id' , hidden : true } ,
			 		    {   xtype : 'textfield' , name : 'stor_id' , hidden : true }
			 	    ]
			 	},
				{   xtype   : 'fieldset',
				    layout  : 'hbox',
				    border  : 0,
	 	 			padding : '0'       ,
	 	 			margin  : '0 0 5 0' ,
				    items   : [
						{ 	fieldLabel 	: Language.get('', '매출번호'),
						   	name 		: 'invc_numb' ,
						   	xtype 		: 'textfield' ,
							width       : 210, //175,
					    	fieldCls    : 'requiredindex',
					    	readOnly	: true
					    	//allowBlank	: false,
					    	//emptyText	: Const.invalid.emptyValue
						}
					 ]
				},
				{   xtype   : 'fieldset',
				    layout  : 'hbox',
				    border  : 0,
	 	 			padding : '0'       ,
	 	 			margin  : '0 0 5 0' ,
				    items   : [
				  		{   fieldLabel  : Language.get( 'date_logi_schd',  '배송예정일' ),
					 		xtype       : 'datefield'   ,
					 		name        : 'inv_dt'      ,
		 			 		editable    : false,
					 		allowBlank  : false         ,
					 		width       : 210,
					 		format      : Const.DATE_FORMAT_YMD_BAR,
					 		submitFormat: Const.DATE_FORMAT_YMD
				      	},
						{	fieldLabel  : Language.get( 'date_bill_schd',  '수금예정일' ),
							xtype       : 'datefield'   ,
							name        : 'pay_dt'      ,
		 			 		editable    : false,
							allowBlank  : false         ,
							width       : 170,
//							margin      : '0 0 0 40',
							format      : Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				},

				/*
					*
						Self.FieldValues['PAYPLAN_DATE' ] :=
						StrToDate(FormatDateTime('YYYY-MM',IncMonth(now(),nxDateMonth))+'-'+cgMethods.FillString('0',-2,StrToIntDef( nxLastDayNo, nxDateValue)));
						pay_dt =
					*
					*/
				{   xtype   : 'fieldset',
				    layout  : 'hbox',
				    border  : 0,
	 	 			padding : '0'       ,
	 	 			margin  : '0 0 5 0' ,
				    items   : [
			 	      	{	fieldLabel 	: Language.get('man_sales', '영업담당' ),
			 				name       	: 'salesman_nm',
			 				pair       	: 'sales_man_id',
			 				xtype      	: 'popupfield',
			 				editable   	: true,
			 				enableKeyEvents : true,
				  	        width      	: 210,
		//		  	        readOnly   	: false,
			 				allowBlank 	: false,
			 			    clearable  	: false,
		//	 			    value       : _global.login_nm ,
			 				popup 		: {
			 					widget 	: 'lookup-user-popup',
			 					select 	: 'SINGLE',
			 					params 	: { stor_grp : _global.stor_grp, line_stat : '0' },
			 		    		result 	: function(records, nameField, pairField ){
			 		    			nameField.setValue(records[0].get('emp_nm'));
			 		    			pairField.setValue(records[0].get('emp_id'));
			 		    			nameField.up('form').down('[name=inv_dept_id]').setValue( records[0].get('dept_nm') );
			 		    		}
			 				}
			 		    },
				  		{   xtype : 'textfield' , name : 'inv_dept_id' , hidden : true  } ,
			 		    {   xtype : 'textfield' , name : 'sales_man_id' , hidden : true  }
	 		    	]
				},
	 		    {	xtype : 'textfield' , name : 'pri_no' , hidden : true  }

 	 	    ]
	    };
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype  : 'tabpanel',
			    region : 'center',
			    plain  : true,
				margin : '0 0 0 0' ,
				hidden : false ,
			    items  : [ me.createTab1(), me.createTab2(), me.createTab3(), me.createTab4() , me.createTab5() ]
		    }
		;
		return tabs;
	},

	createTab1: function() {
		var item = {
			title 		 : '참고사항',
			xtype 		 : 'form-panel',
			border       : 0,
			bodyStyle    : { padding: '5px' },
			fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
			items : [
		 	 	{	xtype   : 'fieldset',
		 	 		layout  : 'hbox' ,
		 	 		padding : '0',
		 	 		border  : 0,
		 	 		margin  : '0 0 0 0',
		 	 		items   : [
				 	 	{	xtype   : 'fieldset',
				 	 		layout  : 'vbox' ,
				 	 		padding :'0',
				 	 		border  : 0,
				 	 		margin  : '0 0 0 0',
				 	 		items   : [
		  		 	      	    {	fieldLabel 	: Language.get('member_clss1', '고객분류1' ),
					 				name       	: 'cls1_nm',
					 				xtype      	: 'textfield',
						  	        width      	: 265,
						  	        fieldCls    : 'readonlyfield',
						  	        readOnly   	: true
					 		    },
		  		 	      	    {	fieldLabel 	: Language.get('member_clss2', '고객분류2' ),
					 				name       	: 'cls2_nm',
					 				xtype      	: 'textfield',
					 				fieldCls    : 'readonlyfield',
						  	        width      	: 265,
						  	        readOnly   	: true
					 		    },
		  		 	      	    {	fieldLabel 	: Language.get('member_clss3', '고객분류3' ),
					 				name       	: 'cls3_nm',
					 				xtype      	: 'textfield',
						  	        width      	: 265,
						  	        fieldCls    : 'readonlyfield',
						  	        readOnly   	: true
						 	 	},
				 	 			{	fieldLabel 	: Language.get('logi_path','배달경로'),
				 	 				name 		: 'cls4_nm',
				 	 				xtype 		: 'textfield',
				 	 				width 		: 265 ,
				 	 				fieldCls    : 'readonlyfield',
				 	 				readOnly    : true
				 	 			},
				 	 		]
				 	 	},
				 	 	{	xtype   : 'fieldset',
				 	 		layout  : 'vbox' ,
				 	 		padding : '0',
				 	 		border  : 0,
				 	 		margin  : '0 0 0 0',
				 	 		items   : [
					 		    { fieldLabel : '전화번호'   ,  name : 'biz_tel_no'  , xtype  : 'textfield'  ,width: 265, readOnly   : false }, // vtype : 'phone' ,
					 		 	{ fieldLabel : '휴대전화'	,  name : 'biz_hp_no'  , xtype  : 'textfield'  ,width: 265, readOnly   : false }, // vtype : 'mobile' ,
					 		 	{ fieldLabel : '팩스번호'   ,  name : 'biz_fax_no'  , xtype  : 'textfield'  ,width: 265, readOnly : false }

				 	 		]
				 	 	}
				 	]
				},
			  	{	fieldLabel  : '고객메모',
			  		xtype       : 'textarea',
			  		name        : 'cust_usr_memo',
			  		width       : 530 ,
			  		height      : 50 ,
			  		fieldCls    : 'readonlyfield',
			  		readOnly    : true
			  	},

	 		]
		}
		;
		return item;
	},


	/**
	 *
	 */

	createTab2 : function() {
		var item = {
			title 		  : '배송지정보',
			xtype 		  : 'form-panel',
			region		  : 'west',
			border        : 0,
			bodyStyle	  : { padding: '5px' },
			fieldDefaults : { width : 315, labelWidth : 70, labelSeparator : '' },//{ width : 315, labelWidth : 60, labelSeparator : '' },
			items         : [
 	 			{	xtype   : 'fieldset',
 	 				layout  : 'vbox',
		 	 		padding :'0',
		 	 		border  : 0,
		 	 		margin  : '0 0 5 0',
			    	items  	: [
						{	xtype        : 'panel',
							layout       : 'hbox',
							border       : 0,
							items        : [
							 	{	xtype        : 'form-panel',
							 		border       : 0,
							 		width        : 250,
							 	    fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							 		items : [
							 		 	{ fieldLabel : '수령자명'   ,  name : 'reve_nm'      , xtype  : 'textfield'  , readOnly     : false },
							 		 	{ fieldLabel : '전화번호'   ,  name : 'reve_tel_no'  , xtype  : 'textfield'  , readOnly     : false }, // , vtype : 'phone'
							 		 	{ fieldLabel : '휴대전화'   ,  name : 'reve_hp_no'  , xtype  : 'textfield'  , readOnly     : false } // , vtype : 'mobile'
							 		]
							 	},
							 	{	xtype        : 'form-panel',
							 		border       :   0,
							 		width        : 250,
							 		fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							 		items : [
							 		 	{ fieldLabel : '팩스번호'     ,  name : 'reve_fax_no'   , xtype  : 'textfield'  , readOnly     : false  },
							 		 	{ fieldLabel : '전자메일'  ,  name : 'reve_email'   , xtype  : 'textfield'  , readOnly   : false} // , vtype : 'email'
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
								{   fieldLabel : '우편번호',
									xtype      : 'popupfield',
									editable   : true,
									enableKeyEvents : true,
									name       : 'reve_zip_cd',
									pair       : 'recv_zip_id',
									allowBlank : true,
									clearable  : false ,
									editable   : true,
									onwerEditing : true,
									width      : 150 ,
//									labelWidth : 60,
									//vtype	   : 'zipcode',
									popup: {
										select : 'SINGLE',
										widget : 'popup-zipcode-search',
										params : { },
										result : function(records, nameField, pairField){
											var panel = nameField.up('form') ;

											nameField.setValue( records[0].get('zip_cd') );
											pairField.setValue( records[0].get('zip_id') );
											panel.down('[name=reve_state]').setValue( records[0].get('state') );
											panel.down('[name=reve_city]').setValue( records[0].get('city') );
											panel.down('[name=reve_dong]').setValue( records[0].get('dong') );
											panel.down('[name=reve_addr_2]').setValue( records[0].get('addr_2') );

											panel.down('[name=reve_addr_2]').focus(true , 10);
										}
									}
								},
								{ name : 'recv_zip_id', xtype : 'textfield' , hidden : true },
					 		 	{ name : 'reve_state' ,  width :  60,  xtype  : 'textfield'    ,readOnly  : true , margin : '0 0 0 5' },
					 		 	{ name : 'reve_city'  ,  width : 100,  xtype  : 'textfield'    ,readOnly  : true , margin : '0 0 0 5' },
					 		 	{ name : 'reve_dong'  ,  width : 170,  xtype  : 'textfield'    ,readOnly  : true , margin : '0 0 0 5' }
					 		]
					 	},
			 		 	{	fieldLabel : '상세주소', xtype: 'textfield', name: 'reve_addr_2',  width: 495, readOnly   : false 	, maxLength   : 100,  maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.' }
			        ]
			    }

		 	]
		}
		;
		return item;
	},

	/**
	 *
	 */

	createTab3 : function() {
		var item = {
			title 		  : '사업장정보',
			xtype 		  : 'form-panel',
			region		  : 'west',
			border        : 0,
			bodyStyle	  : { padding: '5px' },
			fieldDefaults : { width : 315, labelWidth : 70, labelSeparator : '' },//{ width : 315, labelWidth : 60, labelSeparator : '' },
			items         : [
 	 			{	xtype   : 'fieldset',
 	 				layout  : 'vbox',
		 	 		padding :'0',
		 	 		border  : 0,
		 	 		margin  : '0 0 5 0',
			    	items  : [
						{	xtype        : 'panel',
							layout       : 'hbox',
							border       : 0,
							items        : [
							 	{	xtype        : 'form-panel',
							 		border       : 0,
							 		width        : 250,
							 	    fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							 		items : [
							 		 	{ fieldLabel : '등록명칭'   ,  name : 'biz_nm'      , xtype  : 'textfield'  , readOnly     : false },
							 		 	{ fieldLabel : '등록번호'   ,  name : 'biz_no'      , xtype  : 'textfield'  , readOnly     : false },
							 		 	{ fieldLabel : '종목'      ,  name : 'biz_type'   , xtype  : 'textfield'  , readOnly     : false }
							 		]
							 	},
							 	{	xtype        : 'form-panel',
							 		border       :   0,
							 		width        : 250,
							 		fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							 		items : [
							 		 	{ fieldLabel : '대표자'     ,  name : 'biz_owner'   , xtype  : 'textfield'  , readOnly     : false  },
							 		 	{ fieldLabel : '전자메일'	,  name : 'biz_email'   , xtype  : 'textfield'  , readOnly   : false},  // , vtype : 'email'
							 		 	{ fieldLabel : '업종'       ,  name : 'biz_kind'    , xtype  : 'textfield'  , readOnly     : false }
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
								{   fieldLabel : '우편번호',
									xtype      : 'popupfield',
									editable   : true,
									enableKeyEvents : true,
									name       : 'biz_zip_cd',
									pair       : 'biz_zip_id',
									allowBlank : true,
									clearable  : false ,
									editable   : true,
									onwerEditing : true,
									width      : 150 ,
//									labelWidth : 60,
//									vtype	   : 'zipcode',
									popup: {
										select : 'SINGLE',
										widget : 'popup-zipcode-search',
										params : { },
										result : function(records, nameField, pairField){
											var panel = nameField.up('form') ;

											nameField.setValue( records[0].get('zip_cd') );
											pairField.setValue( records[0].get('zip_id') );
											panel.down('[name=biz_state]').setValue( records[0].get('state') );
											panel.down('[name=biz_city]').setValue( records[0].get('city') );
											panel.down('[name=biz_dong]').setValue( records[0].get('dong') );
											panel.down('[name=biz_addr_2]').setValue( records[0].get('addr_2') );

											panel.down('[name=biz_addr_2]').focus(true , 10);
										}
									}
								},
								{ name : 'biz_zip_id', xtype : 'textfield' , hidden : true },
					 		 	{ name : 'biz_state',  width :  60,  xtype  : 'textfield'    ,readOnly  : true , margin : '0 0 0 5' },
					 		 	{ name : 'biz_city'	,  width : 100,  xtype  : 'textfield'    ,readOnly  : true , margin : '0 0 0 5' },
					 		 	{ name : 'biz_dong' ,  width : 170,  xtype  : 'textfield'    ,readOnly  : true , margin : '0 0 0 5' }
					 		]
					 	},
			 		 	{	fieldLabel : '상세주소', xtype: 'textfield', name: 'biz_addr_2',  width: 495, readOnly   : true }
			        ]
			    }
		 	]
		}
		;
		return item;
	},

	/**
	 *
	 */
	createTab4 : function() {
		var item = {
			title 		  : '여신정보',
			xtype 		  : 'form-panel',
			region		  : 'west',
			border        : 0,
			bodyStyle	  : { padding: '5px' },
			fieldDefaults : { width : 315, labelWidth : 70, labelSeparator : '' },//{ width : 315, labelWidth : 60, labelSeparator : '' },  labelWidth : 70,
			items         : [
		 	 	{	xtype   : 'fieldset',
		 	 		layout  : 'hbox' ,
		 	 		padding : '0',
		 	 		border  : 0,
		 	 		margin  : '0 0 5 0',
		 	 		items   : [
		 	 			{	xtype   : 'fieldset',
		 	 				layout  : 'vbox',
				 	 		padding : '0',
				 	 		border  : 0,
				 	 		margin  : '0 0 5 0',
					    	items  : [
					 	 		{   xtype 	   : 'numericfield', //textfield
					 	 			name       : 'npay_amt'  ,
					 	 			readOnly   : true,
					 	 			width      : 265,
					 	 			fieldCls   : 'readonlyfield',
					 	 			fieldLabel : Language.get('cur_ar_amount',  '현미수'  )
					 	 		},
					 	 		{   xtype 	   : 'numericfield',
					 	 			name       : 'ar_amt_lmt' ,
					 	 			readOnly   : true,
					 	 			width      : 265,
					 	 			fieldCls   : 'readonlyfield',
					 	 			fieldLabel : Language.get('ar_limit',       '여신한도'  )
					 	 		},
					 	 		{   xtype 	   : 'numericfield',
					 	 			name       : 'balance_amount'   ,
					 	 			readOnly   : true,
					 	 			width      : 265,
					 	 			fieldCls   : 'readonlyfield',
					 	 			fieldLabel : Language.get('ar_remain',      '여신잔액'  )
					 	 		},
		 	 					{   xtype      : 'fieldset',
		 	 						layout     : 'hbox' ,
		 	 						padding    : '0',
		 	 						border     : 0,
		 	 						margin     : '0 0 5 0',
			 	 					items      : [
						 	 		    {   //xtype      : 'textfield',
						 	 		    	xtype      : 'numericfield',
						 	 		    	name       : 'colt_schd_term'   ,
						 	 		    	readOnly   : true,
						 	 		    	align      : 'right',
						 	 		    	width      : 185,
						 	 		    	fieldCls   : 'readonlyfield',
						 	 		    	fieldLabel : Language.get('date_schedule_bill','수금예정일'  )
						 	 		    },
							 			{   fieldLabel  : '',
											xtype       : 'lookupfield',
											name        : 'colt_schd_type',
											editable    : false,
											readOnly    : true ,
											width       : 75,
											padding     : '0 0 0 5',
											fieldCls    : 'readonlyfield',
											lookupValue : resource.lookup('pay_day_type')
										}
			 	 					]
			 	 				}
					        ]
					    },
		 	 			{	xtype   : 'fieldset',
		 	 				layout  : 'vbox',
				 	 		padding :'0',
				 	 		border  : 0,
				 	 		margin  : '0 0 5 0',
					    	items  : [
				 	 			{   xtype 	   : 'textfield',
				 	 				name       : 'bank_nm'   ,
				 	 				readOnly   : true,
				 	 				width      : 265,
				 	 				fieldCls   : 'readonlyfield',
				 	 				fieldLabel : Language.get('bank_nm',      '은행명'   )
				 	 			},
				 	 			{   xtype 	   : 'textfield',
				 	 				name       : 'vaccount_no'   ,
				 	 				readOnly   : true,
				 	 				width      : 265,
				 	 				fieldCls   : 'readonlyfield',
				 	 				fieldLabel : Language.get('acct_no',   '계좌번호' )
				 	 			},
				 	 			{   xtype 	   : 'textfield',
				 	 				name       : 'bank_holer',
				 	 				readOnly   : true,
				 	 				width      : 265,
				 	 				fieldCls   : 'readonlyfield',
				 	 				fieldLabel : Language.get('account_owner','예금주'   )
				 	 			}
					        ]
					    }
					]
		 	 	}
		 	]
		}
//	 		]
//		}
		;
		return item;
	},


	/**
	 *
	 */
	createTab5 : function() {
		var item = {
			title 		  : '메모사항',
			xtype 		  : 'form-panel',
			region		  : 'west',
			border        : 0,
			bodyStyle	  : { padding: '5px' },
			fieldDefaults : { width : 315, labelWidth : 70, labelSeparator : '' },//{ width : 315, labelWidth : 60, labelSeparator : '' },
			items         : [
		 	 	{	xtype   : 'fieldset',
		 	 		layout  : 'vbox' ,
		 	 		padding : '0',
		 	 		border  : 0,
//		 	 		height  : 300 ,
		 	 		margin  : '0 0 5 0',
		 	 		items   : [
		 	 		    {	xtype 		: 'textarea',
		 	 				name 		: 'req_msg',
		 	 				fieldLabel 	: '요청메모',
					    	maxLength   : 100,
					    	maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
		 	 				height 		: 67,
		 	 				width 		: 500
		 	 			},
		 	 			{	xtype 		: 'textarea',
		 	 				name 		: 'user_memo',
		 	 				fieldLabel 	: '작업메모',
					    	maxLength   : 100,
					    	maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
		 	 				height 		:  67,
		 	 				width 		: 500
		 	 			}
		 	 	    ]
			    }
		 	]
		}

		;
		return item;
	}


});

