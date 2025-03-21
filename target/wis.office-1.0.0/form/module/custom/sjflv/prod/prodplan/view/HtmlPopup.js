Ext.define('module.custom.sjflv.prod.prodplan.view.HtmlPopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-html-popup',

	title	: '점검일지',
	closable: true,
	autoShow: true,
	width	: 1000,
	height	: 800,
	layout	: {
		type: 'border'
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
	createForm: function(){
		var  me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems	: [ me.createToolBar() ],
				items		: [ me.createItem() ]
			}
		;
		return form;
	},
	
	createToolBar: function() {
		var me = this,
		toolBar = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->',
				{ text: Const.FINISH.text, iconCls: Const.FINISH.icon, scope: me, handler: me.finishAction, cls: 'button-style' },
				'-',
				{ text: Const.CLOSER.text, iconCls: Const.CLOSER.icon, scope: me, handler: me.close, cls: 'button-style'}
			]
		};
		return toolBar;
	},
	
	createItem: function(){
		var me = this,
		form = {
			xtype	: 'panel',
			region	: 'center',
			layout	: 'fit',
			defaults: { border: false, margin: 5 },
			items	: [
				me.showHtml()
			]
		};
		return form	
	},

	showHtml: function(){
		var me = this,
			hq_id = _global.hq_id.toUpperCase(),
			api_host = _global.api_host_info,
			url = _global.location.http() + '/custom/sjflv/prod/prodplan/get/html/template.do?param={"hq_id":"'+hq_id+'","api_host":"'+api_host+'"}',
			item = {
				xtype:'component',
				autoEl:{
					tag:'iframe',
					style : 'height:100%;width:100%;border:none',
					src:_global.api_host_info+encodeURI(url)
				},
				id: 'html_viewer'
			}
		;
		return item;
	},
	
	finishAction: function() {
		var document = Ext.getCmp('html_viewer').el.dom.contentWindow.document;
		var inputs = document.querySelectorAll("input");
		var data = {};
		inputs.forEach(input => {
			if (input.type === "checkbox") {
				// 체크박스의 경우 체크 여부를 저장
				data[input.id] = input.checked;
			} else {
				data[input.id] = input.value; // ID와 값을 객체에 저장
			}
		});
	}
});
