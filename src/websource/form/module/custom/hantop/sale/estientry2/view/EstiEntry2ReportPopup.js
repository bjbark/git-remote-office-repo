Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2ReportPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estientry2-report-popup',

	title		: '견적서 발행',
	closable	: true,
	autoShow	: true,
	width		: 260 ,
	height		: 120,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{	text : '<span class="write-button">발행</span>', scope: me,handler: me.callAction, cls: 'button-style'} ,
						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style'} ,
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('chk','발행양식'),
									xtype		: 'lookupfield',
									name		: 'chk',
									itemId		: 'chk',
									editable	:  false,
									labelWidth	: 80,
									width		: 220,
									lookupValue	: [['1','기본견적서'],['2','갑지' ],['3','내역서']]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 발행 버튼 이벤트
	 */

	callAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-estientry2-lister-master')[0],
			select	= master.getSelectionModel().getSelection()[0],
			jrf ,
			resId = _global.hq_id.toUpperCase()
		;

		if(values.chk==''||values.chk==null){
			Ext.Msg.alert("알림","발행양식을 반드시 선택해주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select.get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			switch (values.chk) {
			case '1': jrf='hntop_esti_report1.jrf';
				break;
			case '2': jrf='hntop_esti_report2.jrf';
				break;
			case '3': jrf='hntop_esti_report3.jrf';
			break;

			default: return;
				break;
			}
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},
});
