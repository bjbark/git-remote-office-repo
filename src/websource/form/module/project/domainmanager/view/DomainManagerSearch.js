Ext.define('module.project.domainmanager.view.DomainManagerSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-domainmanager-search',
	/**
	 */
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1(), me.createLine2() , me.createLine3() ];
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
						style	: 'background:url("../../../resource/img/btn_search_icon.png")',
	                    action : Const.SELECT.action,
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
			 			fieldLabel    : 'Table ID'       ,
			 			name          : 'tabl_name'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel    : 'Table 명',
			 			name          : 'tabl_idcd'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel    : 'Field ID'       ,
			 			name          : 'fied_idcd'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel    : 'Field 명'       ,
			 			name          : 'fied_name'   ,
			 			xtype         : 'searchfield'
			 		}
			 	]
			}
		;
		return line;
	},
	/**
	 * 라인1
	 */
	createLine2 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				items : [
			 		{
			 			fieldLabel    : '참조 Table ID'       ,
			 			name          : 'old_tbl'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel    : '참조ID'       ,
			 			name          : 'old_id'   ,
			 			xtype         : 'searchfield'
			 		},{
			 			fieldLabel  : 'DB',
			 			xtype       : 'lookupfield',
			 			name        : 'prjt_dvsn',
			 			editable    : false,
			 			lookupValue : [['','전체'],['MAIN','MAIN'],['CONTROL','관제'], ['SKY','SKY ERP'], ['CHAM1ST','참플러스'], ['FNG','FNG System'], ['DWGNC','동원FNB']],
			 			value       : 'DWGNC'
			 		}
			 	]
			}
		;
		return line;
	},
	/**
	 * 라인1
	 */
	createLine3 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				items : [
			 		{	text    : '<<  Table Create Script Make :  call sp_gen_table(tabl_name, db_kind)  >>',
			 			name	: 'old_tbl'   ,
			 			xtype	: 'label',
			 			margin	: '0 20 0 50'    // 위 , 뒤 , 아래, 앞
			 		}
			 	]
			}
		;
		return line;
	}

});



