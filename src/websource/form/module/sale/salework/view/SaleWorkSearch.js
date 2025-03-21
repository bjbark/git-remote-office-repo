Ext.define('module.sale.salework.view.SaleWorkSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-salework-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items =[ me.createLine1(), me.createLine2(), me.addonSearch()];
		me.callParent();
	},
	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				layout: 'hbox',
				items : [
			 		{   xtype     	: 'betweenfield',
					    name      	: 'fr_dt',
					    fieldLabel 	: '매출일자',
					    pair        : 'to_dt',
					    width       : 182,
					    labelWidth  : 77,
					    root        : true
					},
					{   xtype 	    : 'betweenfield',
					    fieldLabel 	:'~',
					    name 	    : 'to_dt',
					    pair 	    : 'fr_dt',
					    width       : 115,
					    labelWidth 	: 15
					}
 				]
			};
	    return line;
	},

	createLine2 : function(){
		var me = this,
			line ={
				xtype : 'fieldset',
				layout: 'hbox',
				items : [
			 		{   xtype       : 'lookupfield',
			 	 		name        : 'search_id',
			 	 		editable    : false,
			 	 		width       : 75,
			 	 		margin      : '0 0 0 5',
			 			lookupValue : resource.lookup('pointreport.query_word' ).concat( [['5','주문번호'],['6','매출번호'],['7','수령자 이름']] ),
				 		value       : '1'
				 	},
					{ 	name 		: 'find_name' ,
						xtype 		: 'searchfield' ,
						width  		: 215  ,
						margin      : '0 0 0 2',
						clearable   : true,
						emptyText	: Const.infoNull.queryAll
					},
		            {   fieldLabel : Language.get('item', '품목'),
			  		 	xtype      : 'popupfield',
			  		 	editable	: true,
						enableKeyEvents : true,
			  		 	name       : 'item_name',
			  		 	pair       : 'item_idcd',
			  		 	//width      : 300,
			  		 	//labelWidth : 84,
			  		 	//margin     : '0 5 0 0',
			  		 	allowBlank : true,
			  		 	hidden     : true ,
			  		 	emptyText  : Const.infoNull.queryAll,
			  		 	clearable  : true,
			  		 	popup	   : {
			  		 		select : 'SINGLE',
			  		 		widget : 'lookup-item-popup',
			  		 		params : { stor_id : _global.stor_id },
			  		 		result : function(records, nameField, pairField){
			  		 			nameField.setValue(records[0].get('item_name'));
			  		 			pairField.setValue(records[0].get('item_idcd'));
			  		 		}
			 		    }
			  	  	},
			        {   xtype      : 'textfield',  name : 'item_idcd' , hidden: true },
					{	fieldLabel 	: Language.get('member', '고객' ),
		 				name       	: 'cust_name',
		 				pair       	: 'cust_idcd',
		 				xtype      	: 'popupfield',
		 				editable	: true,
						enableKeyEvents : true,
		 				allowBlank 	: true,
			  	        emptyText  	: Const.infoNull.queryAll,
		 			    clearable  	: true,
		 				popup 		: {
		 					widget 	: 'lookup-cust-popup',
		 					select 	: 'SINGLE',
		 					params 	: { stor_id : _global.stor_id , line_stat : '1' },
		 		    		result 	: function(records, nameField, pairField ){
		 		    			nameField.setValue(records[0].get('cust_name'));
		 		    			pairField.setValue(records[0].get('cust_idcd'));
		 		    		}
		 				}
		 			},
		 			{   xtype     	: 'textfield',  name : 'cust_idcd' , hidden: true },
	 			    {   fieldLabel 	: Language.get('man_job', '작업담당' ),
		 				name       	: 'inv_user_nm',
		 				pair       	: 'inv_usr_id',
		 				xtype      	: 'popupfield',
		 				editable	: true,
						enableKeyEvents : true,
		 				//width      	: 190,
		 				//margin      : '0 0 0 15',
		 			    clearable  	: true,
		 				popup      	: {
		 					widget 	: 'lookup-user-popup',
		 					select 	: 'SINGLE',
		 					params 	: { stor_grp : _global.stor_grp },
		 		    		result 	: function(records, nameField, pairField ){
		 		    			nameField.setValue(records[0].get('emp_nm'));
		 		    			pairField.setValue(records[0].get('emp_id'));
		 		    		}
		 				}
		 		    },
		 		    {   xtype     : 'textfield',  name : 'inv_usr_id' , hidden: true }
 				]
			};
		return line;
	},


	addonSearch : function(){
		var me = this,
			line = {
				xtype		: 'fieldset',
//				title		: '추가 조건',
				collapsible : true,
				collapsed	: true,
				layout 		: 'vbox',
				defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 0 0', padding: '0', border: 0 },
				items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						items : [
							{	fieldLabel : Language.get('saup_area', '사업장' ),
				 				name       : 'stor_nm',
				 				pair       : 'stor_id',
				 				xtype      : 'popupfield',
				 				editable	: true,
								enableKeyEvents : true,
				 				labelWidth : 77,
				 				width      : 200 ,
				 			    clearable  : false,
				 			    readOnly   : true,
				 			    fieldCls   : 'readonlyfield',
				 			    value      : _global.stor_nm ,
				 				popup      : {
				 					widget : 'lookup-store-popup',
				 					select : 'SINGLE',
				 					params : { stor_grp : _global.stor_grp , line_stat : '1' },
				 		    		result : function(records, nameField, pairField ){
				 		    			nameField.setValue(records[0].get('stor_nm'));
				 		    			pairField.setValue(records[0].get('stor_id'));
				 		    		}
				 				}
			 			    },
				 			{   xtype       : 'textfield',  name : 'stor_id' , hidden: true , value : _global.stor_id }
				 			,{
					 			fieldLabel  : Language.get('', '마감'),
				 				xtype       : 'lookupfield',
				 	 			name        : 'row_clos',
				 	 			editable    : false,
				 	 			labelWidth : 25 ,
				 	 			width       : 95,
				 				lookupValue : resource.lookup('search_all').concat( resource.lookup('row_clos' )),
					 			value       : ''
					 		}
	 					]
	 				},
					{	xtype : 'fieldset',
						layout: 'hbox',
						margin: '5 0 0 0',
						items : [
				 			{   fieldLabel  : Language.get('', '관리채널'),
				 				xtype       : 'lookupfield',
				 	 			name        : 'chnl',
				 			    multiSelect : true ,
				 	 			editable    : false,
				 	 			width       : 295,
				 	 			labelWidth : 77,
				 				lookupValue : resource.lookup('sale_ch' )
					 		},

	 						{	fieldLabel : Language.get('member_clss1', '고객분류1' ),
				 				name       : 'cls1_nm',
				 				pair       : 'clss_1',
				 				xtype      : 'popupfield',
				 				editable	: true,
								enableKeyEvents : true,
				 				allowBlank : true,
					  	        emptyText  : Const.infoNull.queryAll,
				 			    clearable  : true,
				 				popup: {
				 					widget : 'lookup-base-popup',
				 					select : 'SINGLE',
				 					params : { prnt_id : '9120'},
				 		    		result : function(records, nameField, pairField ){
				 		    			nameField.setValue(records[0].get('bas_nm'));
				 		    			pairField.setValue(records[0].get('bas_id'));
				 		    		}
				 				}
				 			},
				 			{  xtype     : 'textfield',  name : 'clss_1' , hidden: true },

	 						{	fieldLabel : Language.get('member_clss2', '고객분류2' ),
				 				name       : 'cls2_nm',
				 				pair       : 'clss_2',
				 				xtype      : 'popupfield',
				 				editable	: true,
								enableKeyEvents : true,
				 	 			margin     : '0 0 0 0',
				 				allowBlank : true,
					  	        emptyText  : Const.infoNull.queryAll,
				 			    clearable  : true,
				 				popup: {
				 					widget : 'lookup-base-popup',
				 					select : 'SINGLE',
				 					params : {prnt_id : '9121'},
				 		    		result : function(records, nameField, pairField ){
				 		    			nameField.setValue(records[0].get('bas_nm'));
				 		    			pairField.setValue(records[0].get('bas_id'));
				 		    		}
				 				}
				 			},
				 			{  xtype     : 'textfield',  name : 'clss_2' , hidden: true },

	 						{	fieldLabel : Language.get('member_clss3', '고객분류3' ),
				 				name       : 'cls3_nm',
				 				pair       : 'clss_3',
				 				xtype      : 'popupfield',
				 				editable	: true,
								enableKeyEvents : true,
				 				allowBlank : true,
					  	        emptyText  : Const.infoNull.queryAll,
				 			    clearable  : true,
				 				popup: {
				 					widget : 'lookup-base-popup',
				 					select : 'SINGLE',
				 					params : {prnt_id : '9122'},
				 		    		result : function(records, nameField, pairField ){
				 		    			nameField.setValue(records[0].get('bas_nm'));
				 		    			pairField.setValue(records[0].get('bas_id'));
				 		    		}
				 				}
				 			},
				 			{  xtype     : 'textfield',  name : 'clss_3' , hidden: true }
						]
	 				},
					{	xtype : 'fieldset',
						layout: 'hbox',
						margin: '5 0 0 0',
						items : [
				 			{ 	fieldLabel : Language.get('', '작업메모' ),
			 			    	name 		: 'user_memo' ,
								xtype 		: 'searchfield' ,
				 	 			width       : 295,
				 	 			labelWidth  : 77,
//								margin      : '0 0 0 2',
								clearable   : true
//								emptyText	: Const.infoNull.queryAll
							},
							{	boxLabel        : Language.get('check_amount_ar' ,'미수가 있는 매출만'),
								name      		: 'balance_yn',
					   		 	xtype     		: 'checkboxfield',
					   		 	width     		: 140,
					   		 	margin          :'0 0 0 20',
						        inputValue		: 1,
					   		 	uncheckedValue 	: 0
					   		},
					   		{	boxLabel  		: Language.get('' ,'계산서 미발행 매출만'),
								name      		: 'taxprint_yn',
						   		xtype    		: 'checkboxfield',
//			 	 				margin          : '0 0 0 10',
						   		inputValue 		: 1,
						   		uncheckedValue 	: 0
						   	}
						]
	 				}
	 			]
			};
		return line;
	}

});