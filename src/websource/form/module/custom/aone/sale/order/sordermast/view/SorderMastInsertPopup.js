Ext.define('module.custom.aone.sale.order.sordermast.view.SorderMastInsertPopup', {
	extend : 'Axt.popup.Search',
	alias : 'widget.module-aone-sordermast-insert-popup',

	title : '입고등록',
	closable : true,
	autoShow : true,
	width : 260,
	height : 200,
	layout : {
		type : 'border'
	},
	defaultFocus : 'initfocused',

	initComponent : function(config) {
		var me = this;
		me.items = [ me.createForm() ];
		me.callParent(arguments);
	},

	/*
	 * 화면폼
	 */
	createForm : function() {
		var me = this, form = {
			xtype : 'form-panel',
			region : 'center',
			border : false,
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [ '->', {
					xtype : 'button',
					text : Const.FINISH.text,
					iconCls : Const.FINISH.icon,
					scope : me,
					handler : me.finishAction,
					cls : 'button-style'
				}, '-', {
					xtype : 'button',
					text : Const.CLOSER.text,
					iconCls : Const.CLOSER.icon,
					scope : me,
					handler : me.close,
					cls : 'button-style'
				} ]
			} ],
			items : [ me.editorForm() ]
		};
		return form;
	},

	editorForm : function() {
		var me = this, form = {
			xtype : 'form-panel',
			layout : 'vbox',
			border : false,
			margin : '28 0 0 22',
			itemId : '',
			items : [ {
				fieldLabel : Language.get('', '입고일자'),
				xtype : 'datefield',
				width : 170,
				format : Const.DATE_FORMAT_YMD_BAR,
				submitFormat : Const.DATE_format_YMD,
				name : 'istt_date',
				value : new Date()
			}, {
				fieldLabel : '입고유형',
				xtype : Language.get('acpt_dvcd', 'lookupfield'),
				width : 170,
				name : 'acpt_dvcd',								
				lookupValue : resource.lookup('acpt_dvcd'),	
				value : me.popup.param.acpt_dvcd,						
				editable : false
			}, {
				fieldLabel : Language.get('', '반입여부'),
				xtype : 'checkboxfield',
				name : 'brin_yorn'
			}, {
				xtype : 'textfield',
				name : 'modi_yorn',
				hidden : true
			} ]
		}
		return form;
	},

	finishAction : function() {
		var select = this.popup.param.select;
		var me = this, baseform = me.down('form'), values = baseform.getValues();

		// 반입여부 설정 = 1 or 0
		if (null != values.brin_yorn) {
			values.brin_yorn = "1";
		} else {
			values.brin_yorn = "0";
		}

		var record = [];
		Ext.each(select,function(rec){
			record.push({
				istt_date : values.istt_date,
				acpt_dvcd : values.acpt_dvcd,
				invc_numb : rec.get('invc_numb'),
				brin_yorn : values.brin_yorn,
				amnd_degr : rec.get('amnd_degr'),
				line_seqn : rec.get('line_seqn'),
				modi_yorn : values.modi_yorn
			});
		});
		Ext.Ajax.request({
			url : _global.location.http() + '/custom/aone/sale/order/sordermast/set/isttStore.do',
			params : {
				token : _global.token_id,
				param : JSON.stringify({
					records : record
				})
			},
			async : false,
			method : 'POST',
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				if (!result.success) {
					Ext.Msg.error(result.message);
				} else {
					Ext.Msg.alert("알림", "입고 등록이 완료 되었습니다.");
				}
			},
			callback : function(operation) {
				me.close();
				Ext.ComponentQuery.query('module-aone-sordermast-lister-master')[0].getStore().reload();
			}
		})
	}
})