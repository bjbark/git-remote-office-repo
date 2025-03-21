Ext.define('module.qc.insp.inspentry4.view.InspEntry4Popup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-inspentry4-popup',

	title		: '정보입력',
	closable	: true,
	autoShow	: true,
	width		: 300 ,
	height		: 150,
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
						{ xtype: 'button' , text : '<span class="btnTemp" style="font-size:13px;">확인</span>', scope: me, handler: me.finishAction,cls: 'button-style',width: 80, height : 25},'-',
						{ xtype: 'button' , text : '<span class="btnTemp" style="font-size:13px;">닫기</span>', scope: me, handler: me.close,cls: 'button-style',width: 80, height : 25 }
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
			margin	: '0 0 5 0',
			layout	: 'vbox',
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 300,
							items		: [
								{	fieldLabel	: Language.get('wrhs_name','입고창고'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'wrhs_name',
									pair		: 'wrhs_idcd',
									margin		: '13 0 0 2',
									clearable	: true ,
									width		: 250,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-wrhs-popup',
										params	: { stor_grp : _global.stor_grp , row_sts : '0' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('wrhs_name'));
											pairField.setValue(records[0].get('wrhs_idcd'));
										}
									}
								},{ xtype:'textfield', name:'wrhs_idcd', hidden:true
								},{	fieldLabel	: Language.get('drtr_name','담당자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'user_name',
									pair		: 'user_idcd',
									margin		: '13 0 0 2',
									clearable	: true ,
									width		: 250,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: { stor_grp : _global.stor_grp , row_sts : '0' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
											me.down('textfield[name="dept_idcd"]').setValue(records[0].get('dept_idcd'));
										}
									}
								},{	xtype	: 'textfield',
									name	:'user_idcd',
									hidden	:true
								},{	xtype: 'textfield',
									name	: 'dept_idcd',
									hidden	: true
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
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		// 삼정, 삼정향료 입고등록 처리
		if (_global.hq_id.toUpperCase()=='N1000SJUNG' || _global.hq_id.toUpperCase()=='N1000SJFLV') {
			this.finishAction2();
			return false;
		}
		
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-inspentry4-lister')[0],
			selects = master.getSelectionModel().getSelection(),
			itemId  = me.param.itemId,
			records = [],
			url		='',
			val,
			prod	= selects[0].data.prod_qntt
			numb	= selects[0].data.invc_numb
		;
		
		for (var i = 0; i < selects.length; i++) {
			records.push({ invc_numb : selects[i].get('invc_numb'),line_seqn:selects[i].get('line_seqn')});
		}

		console.log(me.param.itemId);
		console.log(numb);
		console.log(Ext.Date.format(new Date(),'Ymd'));


		if(values.wrhs_idcd==''||values.wrhs_idcd==null){
			Ext.Msg.alert("알림","입고창고를 선택해주십시오.");
		}else if(values.user_idcd==''||values.user_idcd==null){
			Ext.Msg.alert("알림","담당자를 선택해주십시오.");
		}else{
			if(itemId == 'action1'){
				url = _global.location.http() + '/qc/insp/inspentry4/set/pass2.do';
				val = JSON.stringify({
					wrhs_idcd	: values.wrhs_idcd,
					insp_date	: Ext.Date.format(new Date(),'Ymd'),
					drtr_idcd	: values.user_idcd,
					records		: records
				})
			}else if(itemId == 'action2'){
				url = _global.location.http() + '/qc/insp/inspentry4/set/pass3.do';
				val = JSON.stringify({
					wrhs_idcd	: values.wrhs_idcd,
					istt_date	: Ext.Date.format(new Date(),'Ymd'),
					drtr_idcd	: values.user_idcd,
					records		: records
				})
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: url,
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					param : val,
					prod_qntt : prod,
					invc_numb : numb
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if(itemId == 'action1'){
					Ext.Msg.alert("알림", "합격처리가 완료 되었습니다.");
				}else if(itemId == 'action2'){
					Ext.Msg.alert("알림", "입고등록이 완료 되었습니다.");
				}
				master.getStore().reload();
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});

	},
	
	// [삼정, 삼정향료] 입고등록
	finishAction2: function() {
		var me = this,
		mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask }),
		masterData = me.popup.params.master.getSelectionModel().getSelection()[0],
		formData = me.down('form-panel').getValues();
		
		if (formData.wrhs_idcd === "" || formData.user_idcd === "") {
			Ext.Msg.alert("알림","입고창고 및 담당자를 선택해주십시오.");
			return false;
		}
		
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/qc/insp/inspentry4/set/pass4.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb: masterData.get('work_book_invc_numb'),
					wrhs_idcd: formData.wrhs_idcd,
					drtr_idcd: formData.user_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if (result.success === true) {
					me.popup.params.master.getStore().reload();
					Ext.Msg.alert("알림","입고등록 완료.");
				} else {
					Ext.Msg.alert('알림', result.message);
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){
				mask.hide();
				me.close();
			}
		});
	}
});
