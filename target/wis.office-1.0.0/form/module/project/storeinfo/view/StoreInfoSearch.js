Ext.define('module.project.storeinfo.view.StoreInfoSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-storeinfo-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
		 	me.createLine1(),
		 	me.createLine2(),
//		 	me.createLine3()
		];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
		 		,region	: 'center'
	    	    ,width	: '100%'
	    	    ,height  : 40
	    	    ,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset'
						,border	: 3
						,flex	: 1
						,style	: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region	: 'center'
					    ,height	: 34
					    ,margin : '3 0 0 0'
					    ,defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
					    ,layout	: 'hbox'
					    ,items	: [
			 	 			{   xtype	: 'label',
			 	 			    text	: 'SEARCH  | ',
			 	 			    margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
			 	 			},{	name	: 'find_nm'     ,
					 			xtype	: 'searchfield',
								flex	: 4,
								emptyText : '검색할 매장코드 또는 매장명을 입력하세요...',
						 		enableKeyEvents : true,
								listeners:{
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
										}
			 			 			},
			 					}
					 		}
					    ]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			}
		;
		return line;
	},
	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				items : [
				 	{
				 		name         : 'search_id'    ,
				 		xtype        : 'lookupfield'  ,
				 		width        : 74 ,
				 		fieldStyle   : 'text-align:right;',
				 		lookupValue  : resource.lookup( 'search_all' ).concat( [['1','청약코드' ] , ['2','청약명칭'], ['4','계약내용' ] ]),
				 		value        : '2'
				 	},{
				 		name         : 'search_nm'    ,
				 		xtype        : 'searchfield'  ,
				 		margin       : '0 0 0 2'
				 	},{
				 		fieldLabel  : '청약상태',
				 		xtype       : 'lookupfield',
				 		name        : 'rqust_sts',
				 		multiSelect : true ,
				 		editable    : false,
				 		width       : 417,
				 		lookupValue : resource.lookup('rqust_stat' ),
				 		value       : ['1000','2000','2500']

				 	},{
				 		fieldLabel  : '본사상태',
				 		xtype       : 'lookupfield',
				 		name        : 'hq_sts',
				 		multiSelect : true ,
				 		editable    : false,
				 		lookupValue : resource.lookup('hqof_stat' )
//				 	},{
//				 		xtype      : 'popupfield',
//						editable	: true,
//						enableKeyEvents : true,
//				 		fieldLabel : '프로젝트',
//				 		name       : 'pjt_nm',
//				 		pair       : 'pjt_id',
//				 		//labelAlign : 'right',
//				 		labelWidth : 59,
//				 		width      : 200,
//				 		allowBlank : true,
//				 		popup: {
//				 			select : 'SINGLE',
//				 			widget : 'lookup-projinfo-popup',
//				 			params : { row_sts : 0 }, // stor_id : _global.stor_id,
//				 			result :  function(records, nameField, pairField ){
//				 				nameField.setValue(records[0].get('pjt_nm'));
//				 				pairField.setValue(records[0].get('pjt_id'));
//				 			}
//				 		}
				 	},{
				 		xtype  : 'textfield',
				 		name   : 'pjt_id'  ,
				 		hidden : true
				 	}
				]
			}
		;
		return line;
	},

	/**
	 * 라인2
	 */
	createLine2 : function(){
		var me = this,
			line = {
			xtype : 'fieldset',
			items : [
			 	{
			 		xtype      : 'popupfield',
					editable	: true,
					enableKeyEvents : true,
			 		fieldLabel : '본사코드',
			 		name       : 'hq_nm',
			 		pair       : 'hq_id',
			 		allowBlank : true,
			 		popup: {
			 			select : 'SINGLE',
			 			widget : 'lookup-bonsa-popup',
			 			params : { hq_sts : ['1000' ] , row_sts : 0 },
			 			result :  function(records, nameField, pairField ){
			 				nameField.setValue(records[0].get('hq_nm'));
			 				pairField.setValue(records[0].get('hq_id'));
			 			}
			 		}
			 	},{
			 		xtype  : 'textfield',
			 		name   : 'hq_id'  ,
			 		hidden : true
			 	},{
			 		xtype      : 'popupfield',
					editable	: true,
					enableKeyEvents : true,
			 		fieldLabel : '본사그룹',
			 		name       : 'bonsa_gn',
			 		pair       : 'hq_grp',
			 		allowBlank : true,
			 		popup: {
			 			select : 'SINGLE',
			 			widget : 'lookup-bonsa-popup',
			 			params : { hq_sts : ['1000' ] , group_yn : '1' , row_sts : 0 },
			 			result :  function(records, nameField, pairField ){
			 				nameField.setValue(records[0].get('hq_nm'));
			 				pairField.setValue(records[0].get('hq_id'));
			 			}
			 		}
			 	},{
			 		xtype  : 'textfield',
			 		name   : 'hq_grp'  ,
			 		hidden : true
			 	},{
			 		fieldLabel : '청약유형',
			 		name       : 'stor_grp',
			 		xtype      : 'lookupfield',
			 		editable   : false  ,
			 		width 		: 215,
			 		lookupValue : resource.lookup( 'search_all' ).concat(  resource.lookup('stor_grp' ))
			 	},{
			 		fieldLabel  : '청약구분',
			 		name       : 'rqust_gb',
			 		xtype      : 'lookupfield',
			 		editable   : false,
			 		lookupValue : resource.lookup( 'search_all' ).concat( resource.lookup('rqust_gb' ) )
			 	}
			]
		};
		return line;
	},

	/**
	 * 라인2
	 */
	createLine3 : function(){
		var me = this, line =
		{
			xtype : 'fieldset',
			items : [
	 		 	{
	 		 		xtype      : 'popupfield',
					editable	: true,
					enableKeyEvents : true,
	 		 		name       : 'distr_nm',
	 		 		pair       : 'chnl_id',
	 		 		fieldLabel : '영업채널',
	 		 		popup: {
	 		 			select : 'SINGLE',
	 		 			widget : 'lookup-distr-popup',
	 		 			params : { row_sts : 0 },
	 		 			result :  function(records, nameField, pairField ){
	 		 				var me = this;
	 		 				nameField.setValue(records[0].get('distr_nm'));
	 		 				pairField.setValue(records[0].get('chnl_id'));
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
	 		 		popup: {
	 		 			select : 'SINGLE',
	 		 			widget : 'lookup-distr-popup',
	 		 			params : { row_sts : 0 },
	 		 			result :  function(records, nameField, pairField ){
	 		 				var me = this;
	 		 				nameField.setValue(records[0].get('distr_nm'));
	 		 				pairField.setValue(records[0].get('chnl_id'));
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
	 		 		popup: {
	 		 			select : 'SINGLE',
	 		 			widget : 'lookup-phone-popup',
	 		 			params : { row_sts : 0 },
	 		 			result :  function(records, nameField, pairField ){
	 		 				var me = this;
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
	 		 		popup: {
	 		 			select : 'SINGLE',
	 		 			widget : 'lookup-charge-popup',
	 		 			params : { row_sts : 0 },
	 		 			result :  function(records, nameField, pairField ){
	 		 				var me = this;
	 		 				nameField.setValue(records[0].get('chrg_nm'));
	 		 				pairField.setValue(records[0].get('chrg_id'));
	 		 			}
	 		 		}
	 		 	},{
	 		 		xtype      : 'textfield', name: 'chrg_id', hidden:true
	 		 	}

			]
		};
		return line;
	}


});



