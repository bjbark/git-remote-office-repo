Ext.define('module.notice.dailyreport.view.DailyReportSearch', {extend: 'Axt.form.Search',

	alias: 'widget.module-dailyreport-search',

	initComponent: function(){
		var me = this;


		me.items = [ me.searchBasic(), me.addonSearch() ];
		me.callParent();
	},

	dateTest: function() {
		var currentDay = new Date(),
			theYear = currentDay.getFullYear(),
			theMonth = currentDay.getMonth(),
			theDate  = currentDay.getDate(),
			theDayOfWeek = currentDay.getDay(),
			thisWeek = []
		;
		for(var i=0; i<7; i++) {
			var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek)),
				yyyy = resultDay.getFullYear(),
				mm = Number(resultDay.getMonth()) + 1,
				dd = resultDay.getDate()
			;
			mm = String(mm).length === 1 ? '0' + mm : mm;
			dd = String(dd).length === 1 ? '0' + dd : dd;

			thisWeek[i] = yyyy + '-' + mm + '-' + dd;
		}
		return thisWeek;
	},

	searchBasic: function() {
		var me = this,
			line =
				{	xtype	: 'fieldset',
					border	: 0,
					style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
					region	: 'center',
					width	: '100%',
					height	: 40,
					margin	: '0 40 0 40',
					items	: [
						{	xtype		: 'fieldset',
							border		: 3,
							flex		: 1,
							style		: { borderColor : '#000081', borderStyle : 'solid' },
							region		: 'center',
							height		: 34,
							margin 		: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		:[
								{	xtype		: 'label',
									fieldCls	: 'requiredindex',
									text		: 'SEARCH  | ',
									margin		: '7 10 0 0',
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	fieldLabel	: Language.get('user_idcd','사원'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'user_name',
									itemId		: 'user_name',
									pair		: 'user_idcd',
									allowBlank	: true,
									clearable	: true ,
									width		: 200,
									value		: !_global.auth.auth_admn_1001?_global.login_nm: '',
									emptyText	: '조회할 사원을 입력하세요...',
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField){
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name		: 'user_idcd', xtype : 'textfield', hidden : true, value : !_global.auth.auth_admn_1001?_global.login_pk: '',
									listeners	: {
										change	: function(field, val){
											var lister = Ext.ComponentQuery.query('module-dailyreport-lister')[0];
											if(val){
												lister.select({
													callback:function(records, operation, success) {
														if (success && records.length > 0) {
															lister.getSelectionModel().select(0);
														}
													}, scope:me
												}, Ext.merge( me.getValues(), { hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
											}else{
												lister.getStore().clearData();
												lister.getStore().loadData([], false);
											}
										}
									}
								},{	name		: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 업무일지를 입력하세요...',
									enableKeyEvents : true,
									listeners	:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												var searchButton = self.up('form').down('[action=selectAction]');
												searchButton.fireEvent('click', searchButton); //조회버튼클릭
											}
										},
									}
								}
							]
						},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
						}
					]
				};
		return line;
	},

	addonSearch: function() {
		var date = this.dateTest();
		var me = this,
		line = {
			xtype		: 'fieldset',
			title		: '상세검색',
			collapsible : true,
			collapsed	: false,
			layout		: 'vbox',
			defaults	: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 },
			fieldDefaults	: { width: 341, labelWidth : 100, labelSeparator : '' },
			items		: [
				{	xtype : 'fieldset',
					layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('dwup_date','근무일자'),
							xtype		: 'betweenfield',
							name		: 'fr_dt',
							pair		: 'to_dt',
							width		: 225,
							labelWidth	: 127,
							margin		: '0 0 0 2',
							root		: true,
							value		: date[1],
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'to_dt',
							pair		: 'fr_dt',
							width		: 110,
							labelWidth	: 12,
							value		: date[5],
						},{	fieldLabel	: Language.get('apvl_dvcd','승인구분'),
							xtype		: 'lookupfield',
							name		: 'apvl_dvcd',
							value		: resource.lookup('search_all')[0],
							lookupValue	: resource.lookup('search_all').concat( resource.lookup('apvl_dvcd')),
							width		: 130,
							labelWidth	: 60
						},{	fieldLabel	: Language.get('prjt_idcd','프로젝트'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'prjt_name',
							itemId		: 'prjt_name',
							pair		: 'prjt_idcd',
							width		: 215,
							labelWidth	: 60,
							margin		: '0 0 5 0',
							clearable	: true,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-prjt-popup',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].get('prjt_name'));
									pairField.setValue(records[0].get('prjt_idcd'));
								}
							}
						},{	name	: 'prjt_idcd', xtype : 'textfield', hidden : true
						}
					]
				}
			]
		};
	return line;
	}
});