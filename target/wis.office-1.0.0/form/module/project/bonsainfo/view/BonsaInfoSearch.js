Ext.define('module.project.bonsainfo.view.BonsaInfoSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-bonsainfo-search',
	initComponent: function(){
		var me = this;
		me.items = [
		 	me.searchBasic(),me.createLine1()
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
								style  : 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
			 	 			},{	name	: 'find_nm'     ,
					 			xtype	: 'searchfield',
								flex	: 4,
								emptyText: '본사 코드 또는 명칭을 입력하세요...',
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
	 * 라인2
	 */
	createLine1 : function(){
		var me = this,
			line = {
			xtype : 'fieldset',
    	    margin	: '0 40 0 40',
    	    height	: 28,
			items : [
				{	xtype      : 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldLabel : '본사그룹',
					name       : 'bonsa_gn',
					pair       : 'hq_grp',
					labelAlign : 'right',
					labelWidth : 59,
					width      : 200,
					allowBlank : true,
					popup: {
						 select : 'SINGLE',
						 widget : 'lookup-bonsa-popup',
						 params : { hq_sts : ['1000' ] , group_yn : '1' , row_sts : 0 }, // stor_id : _global.stor_id,
						 result :  function(records, nameField, pairField ){
							 nameField.setValue(records[0].get('hq_nm'));
							 pairField.setValue(records[0].get('hq_id'));
						 }
					 }
				 },{ xtype  : 'textfield',
					 name   : 'hq_grp'  ,
					 hidden : true
				},
				{	fieldLabel  : '청약상태',
					xtype       : 'lookupfield',
					name        : 'hq_sts',
					multiSelect : true ,
					editable    : false,
					width       : 310,
					lookupValue : resource.lookup('hqof_stat' ),
					value       : ['1000', '2000' ,'2500' ]
				}
			]
		};
		return line;
	}


});



