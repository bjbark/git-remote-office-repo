Ext.define('module.custom.dhtec.prod.workentry.view.WorkEntryEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-dhtec-workenty-editor',
	layout : {
	type: 'border'
	},
	title			: Language.get('',''),
	collapsible 	: false	,
	collapsed		: false	,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock()];
		me.items = [me.createwest()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				itemId: 'editorTool',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				title	: '생산내역',
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('invc_numb','지시번호'),
								name		: 'invc_numb',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 255
							},{	xtype		: 'lookupfield',
								name		: 'work_dvcd',
								width		: 80,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('work_dvcd')
							},{	fieldLabel	: Language.get('lott_numb','생산LOT번호'),
								labelWidth	: 120,
								width		: 295,
								xtype		: 'textfield',
								name		: 'lott_numb',
								margin		: '0 0 0 5',
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											work_date	= panel.down('[name=work_date]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											work_date.focus(true , 10)
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'textfield',
								name		: 'cstm_name',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 340
							},{	fieldLabel	: Language.get('work_date','생산일자'),
								labelWidth	: 120,
								xtype		: 'datefield',
								name		: 'work_date',
								margin		: '0 0 0 5',
								width		: 295,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											work_sttm	= panel.down('[name=work_sttm]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											work_sttm.focus(true , 10)
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_code','품목코드'),					// temp
								xtype		: 'textfield',
								name		: 'item_code',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 255,
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	xtype		: 'numericfield',
								name		: 'bomt_degr',
								width		: 80,
								margin		: '0 0 0 5',
								emptyText	: 'BOM차수',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('work_sttm','생산시간'),
								labelWidth	: 120,
								xtype		: 'timefield',
								name		: 'work_sttm',
								margin		: '0 0 0 5',
								format: 'H:i',
								increment: 30,
								anchor: '100%',
								width		: 200,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											work_edtm	= panel.down('[name=work_edtm]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											work_edtm.focus(true , 10)
										}
									}
								},
							},{ labelWidth	: 10,
								fieldLabel	: Language.get('','~'),
								xtype		: 'timefield',
								name		: 'work_edtm',
								margin		: '0 0 0 5',
								format: 'H:i',
								increment: 30,
								anchor: '100%',
								width		: 90,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											work_pcnt	= panel.down('[name=work_pcnt]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											work_pcnt.focus(true , 10)
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item','품목'),
								name		: 'item_name',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('work_pcnt','작업인원'),
								labelWidth	: 120,
								width		: 295,
								xtype		: 'numericfield',
								name		: 'work_pcnt',
								margin		: '0 0 0 5',
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											prod_qntt	= panel.down('[name=good_qntt]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											prod_qntt.focus(true , 10)
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_spec','규격'),
								name		: 'item_spec',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
								labelWidth	: 120,
								width		: 295,
								xtype		: 'numericfield',
								name		: 'prod_qntt',
								margin		: '0 0 0 5',
								enableKeyEvents: true ,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								value		: 0,
								listeners	: {
									change : function(val) {
										var panel		= this.up('form');
											panel.down('[name=poor_qntt]').setValue(0);
											panel.down('[name=good_qntt]').setValue(0);
									},
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											good_qntt	= panel.down('[name=good_qntt]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											good_qntt.focus(true , 10)
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('modl_name','모델명'),
								xtype		: 'textfield',
								name		: 'modl_name',
								width		: 340,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('good_qntt','양품수량'),
								labelWidth	: 120,
								width		: 295,
								xtype		: 'numericfield',
								style		: 'color:blue',
								name		: 'good_qntt',
								labelStyle	: 'color:blue',
								margin		: '0 0 0 5',
								enableKeyEvents: true ,
								listeners	: {
									change : function(val) {
										var panel		= this.up('form'),
											poor_qntt	= Number(panel.down('[name=poor_qntt]').getValue()),
											value		= Number(val.getValue()),
											prod_qntt	= Number(panel.down('[name=prod_qntt]').getValue())
										;
										if(value>(prod_qntt+poor_qntt)){
											var temp = prod_qntt - poor_qntt;
											if(temp < 0) {
												val.setValue(0);
											}
											else{
												val.setValue(temp);
											}
										}
									},
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											poor_qntt	= panel.down('[name=poor_qntt]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											poor_qntt.focus(true , 10)
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('indn_qntt','지시수량'),
									xtype		: 'numericfield',
									name		: 'indn_qntt',
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									width		: 180,
									margin		: '0 160 0 0',
							},{	fieldLabel	: Language.get('poor_qntt','불량수량'),
								labelWidth	: 120,
								width		: 295,
								xtype		: 'numericfield',
								labelStyle	: 'color:red',
								name		: 'poor_qntt',
								margin		: '0 0 0 5',
								listeners	:{
									change : function(val) {
										var panel		= this.up('form'),
											good_qntt	= Number(panel.down('[name=good_qntt]').getValue()),
											value		= Number(val.getValue()),
											prod_qntt	= Number(panel.down('[name=prod_qntt]').getValue())
										;
										if(value>(prod_qntt+good_qntt)){
											var temp = prod_qntt - good_qntt;
											if(temp < 0) {
												val.setValue(0);
											}
											else{
												val.setValue(temp);
											}
										}
									},
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: "",
								margin		: '0 400 0 0',
							},{	text	: "<span style='color:white'>생산실적 가져오기</span>",
								width		: 220,
								xtype		: 'button',
								margin		: '0 0 0 20',
								cls: 'button-style',
								handler: me.getProd_qntt
							}
						]
					}
				]
			}
		;
		return item;
	},
	getProd_qntt : function() {
		var param = Ext.merge( this.up('form').getValues());
		var prod_qntt;
		console.log(param);
		if(!param.invc_numb){
			Ext.Msg.alert('알림','생산실적을 선택하여주세요.');
		}else{
			if(!param.work_date){
				Ext.Msg.alert('알림','생산일자를 선택하여주세요.');
			}else{
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/dhtec/prod/workentry/get/prod.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							invc_numb		: param.invc_numb,
							work_date		: param.work_date,
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							console.log(result);
							if(result.records[0].prod_qntt){
								prod_qntt = result.records[0].get('prod_qntt');
							}else{
								prod_qntt =0;
							}
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
				this.up('form').down('[name=prod_qntt]').setValue(prod_qntt);
			}
		}
	}
});