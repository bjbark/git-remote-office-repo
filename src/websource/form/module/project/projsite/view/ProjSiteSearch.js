Ext.define('module.project.projsite.view.ProjSiteSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-projsite-search',
	/**
	 * ControlUtil.
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.createLine1(),
			me.addonSearch()
		];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_nm'     ,
								xtype	: 'searchfield',
								flex	: 4,
								emptyText : '검색할 본사명 또는 코드를 입력하세요...',
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
				xtype		: 'fieldset',
				defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 0', padding:'0', border: 0 },
				items		: [
				 	{	xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						fieldLabel	: '본사그룹',
						name		: 'hq_gn',
						pair		: 'hq_grp',
						labelAlign	: 'right',
						allowBlank	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-bonsa-popup',
							params	: { hq_sts : ['1000' ] , group_yn : '1' , row_sts : 0 }, // stor_id : _global.stor_id,
							result	:  function(records, nameField, pairField ){
								nameField.setValue(records[0].get('hq_nm'));
								pairField.setValue(records[0].get('hq_id'));
							}
						}
					},{	xtype		: 'textfield',
						name		: 'hq_grp'  ,
						hidden		: true
					},{	fieldLabel	: '본사상태',
						xtype		: 'lookupfield',
						name		: 'hq_sts',
						multiSelect	: true ,
						editable	: false,
						width		: 310,
						lookupValue	: resource.getList('hqof_stat' ),
						value		: ['1000' ]
					},{	xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						fieldLabel	: 'Project',
						name		: 'pjt_nm',
						pair		: 'pjt_id',
						//labelAlign : 'right',
						labelWidth	: 59,
						width		: 200,
						allowBlank	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-projinfo-popup',
							params	: { row_sts : 0 }, // stor_id : _global.stor_id,
							result	:  function(records, nameField, pairField ){
								nameField.setValue(records[0].get('pjt_nm'));
								pairField.setValue(records[0].get('pjt_id'));
							}
						}
					},{	xtype		: 'textfield',
						name		: 'pjt_id'  ,
						hidden		: true
					}

				]
			}
		;
		return line;
	},


	addonSearch : function(){
		var line = {
			xtype		: 'fieldset',
			collapsible	: true,
			collapsed	: true,
			layout		: 'vbox',
			defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 0', padding:'0', border: 0 },
			items		: [
				{	xtype : 'fieldset',
					items :
					[
					]
				},{	xtype	: 'fieldset',
					items	: [
						{	fieldLabel	: '사용여부',
							xtype		: 'lookupfield',
							name		: 'row_sts',
							editable	: false,
							lookupValue	: resource.getList('search_all').concat( resource.getList('line_stat' )) ,
							value		: '0'
						},{	fieldLabel	: 'DB Server',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'pos_hostname',
							pair		: 'pos_host',
							emptyText	: Const.infoNull.queryAll,
							popup		: {
								widget	: 'lookup-hostinfo-popup',
								select	: 'SINGLE',
								params	: { row_sts : 0 },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('host_cd'));
									pairField.setValue(records[0].get('host_id'));
								}
							}
						},{	xtype		: 'textfield', name : 'pos_host' , hidden : true
						},{	fieldLabel	: 'S/M Server',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'web_hostname',
							pair		: 'web_host',
							emptyText	: Const.infoNull.queryAll,
							popup		: {
								widget	: 'lookup-hostinfo-popup',
								select	: 'SINGLE',
								params	: { row_sts : 0 },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('host_cd'));
									pairField.setValue(records[0].get('host_id'));
								}
							}
						},{	xtype		: 'textfield', name : 'web_host' , hidden : true
						},{	fieldLabel	: 'Image Server',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'img_hostname',
							pair		: 'img_host',
							emptyText	: Const.infoNull.queryAll,
							popup		: {
								widget	: 'lookup-hostinfo-popup',
								select	: 'SINGLE',
								params	: { row_sts : 0 },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('host_cd'));
									pairField.setValue(records[0].get('host_id'));
								}
							}
						},{	xtype		: 'textfield', name : 'img_host' , hidden : true
						}

					]
				}
			]
		};
		return line;
	}

});



