Ext.define('module.basic.hldymast.view.HldyMastPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-hldymast-popup',

	title		: '법정공휴일 등록',
	closable	: true,
	autoShow	: true,
	width		: 350 ,
	height		: 288,
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
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
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
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 95, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 10 0',
									items	: [
										{	fieldLabel	: '년도',
											name		: 'year',
											itemId		: 'year',
											xtype		: 'textfield',
											width		: 190,
											readOnly	: false,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											maxLength	: 4,
											minLength	: 4
										},{	text		: '<span class="btnTemp" style="font-size:1.3em">주말등록</span>',
											xtype		: 'button',
											width		: 89,
											height		: 25,
											margin		: '0 0 0 16',
											cls			: 'button-style',
											handler		: me.weekendAction
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 10 0',
									items	: [
										{	fieldLabel	: '창립기념일',
											xtype		: 'betweenfield',
											name		: 'est1_date',
											pair		: 'est2_date',
											width		: 190,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										},{	fieldLabel	: '~',
											xtype		: 'betweenfield',
											name		: 'est2_date',
											pair		: 'est1_date',
											width		: 105,
											labelWidth	: 10,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 10 0',
									items	: [
										{	fieldLabel	: '설날휴가',
											xtype		: 'betweenfield',
											name		: 'new1_date',
											pair		: 'new2_date',
											width		: 190,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										},{	fieldLabel	: '~',
											xtype		: 'betweenfield',
											name		: 'new2_date',
											pair		: 'new1_date',
											width		: 105,
											labelWidth	: 10,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 10 0',
									items	: [
										{	fieldLabel	: '하계휴가',
											xtype		: 'betweenfield',
											name		: 'sum1_date',
											pair		: 'sum2_date',
											width		: 190,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										},{	fieldLabel	: '~',
											xtype		: 'betweenfield',
											name		: 'sum2_date',
											pair		: 'sum1_date',
											width		: 105,
											labelWidth	: 10,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 10 0',
									items	: [
										{	fieldLabel	: '추석휴가',
											xtype		: 'betweenfield',
											name		: 'giv1_date',
											pair		: 'giv2_date',
											width		: 190,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										},{	fieldLabel	: '~',
											xtype		: 'betweenfield',
											name		: 'giv2_date',
											pair		: 'giv1_date',
											width		: 105,
											labelWidth	: 10,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 10 0',
									items	: [
										{	fieldLabel	: '부처님오신날',
											xtype		: 'betweenfield',
											name		: 'bud1_date',
											pair		: 'bud2_date',
											width		: 190,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										},{	fieldLabel	: '~',
											xtype		: 'betweenfield',
											name		: 'bud2_date',
											pair		: 'bud1_date',
											width		: 105,
											labelWidth	: 10,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											value		: ''
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	weekendAction: function(){
		var me= Ext.ComponentQuery.query('module-hldymast-popup')[0],
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			lister	= Ext.ComponentQuery.query('module-hldymast-lister')[0],
			store  = lister.getStore()
		;
		if(values.year==''||values.year==null){
			Ext.Msg.alert("알림","년도를 반드시 입력해주십시오.");
		}else if(values.year.length!=4){
			Ext.Msg.alert("알림","년도를 다시 입력해주십시오.");
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/basic/hldymast/set/weekend.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						year			: values.year		//년도
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "주말등록이 완료 되었습니다.");
					store.reload();
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){
				}
			});
		}
	},

	//확인
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			lister	= Ext.ComponentQuery.query('module-hldymast-lister')[0],
			store	= lister.getStore()
		;
		if(values.est1_date>values.est2_date){
			Ext.Msg.alert("알림","창립기념일 기간을 다시 입력해주십시오.");
		}else if(values.est1_date!=''&&values.est2_date==''){
			Ext.Msg.alert("알림","창립기념일 기간을 다시 입력해주십시오.")
		}else if(values.new1_date>values.new2_date){
			Ext.Msg.alert("알림","설날휴가 기간을 다시 입력해주십시오.");
		}else if(values.new1_date!=''&&values.new2_date==''){
			Ext.Msg.alert("알림","설날휴가 기간을 다시 입력해주십시오.");
		}else if(values.sum1_date>values.sum2_date){
			Ext.Msg.alert("알림","하계휴가 기간을 다시 입력해주십시오.");
		}else if(values.sum1_date!=''&&values.sum2_date==''){
			Ext.Msg.alert("알림","하계휴가 기간을 다시 입력해주십시오.");
		}else if(values.giv1_date>values.giv2_date){
			Ext.Msg.alert("알림","추석휴가 기간을 다시 입력해주십시오.");
		}else if(values.giv1_date!=''&&values.giv2_date==''){
			Ext.Msg.alert("알림","추석휴가 기간을 다시 입력해주십시오.");
		}else if(values.bud1_date>values.bud2_date){
			Ext.Msg.alert("알림","부처님오신날 기간을 다시 입력해주십시오.");
		}else if(values.bud1_date!=''&&values.bud2_date==''){
			Ext.Msg.alert("알림","부처님오신날 기간을 다시 입력해주십시오.");
		}else if(values.est1_date == ''&&values.est2_date == ''&&values.sum1_date==''&&values.sum2_date==''
				&&values.new1_date == ''&&values.new2_date == ''&&values.giv1_date == ''&&values.giv2_date == ''
				&&values.bud1_date == ''&&values.bud2_date == ''){
			Ext.Msg.alert("알림","입력된 기간이 없습니다.");
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/basic/hldymast/set/holiday.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						est1_date		: values.est1_date,	//창립기념일
						est2_date		: values.est2_date,	//창립기념일
						new1_date		: values.new1_date,	//설날휴가
						new2_date		: values.new2_date,	//설날휴가
						sum1_date		: values.sum1_date,	//하계휴가
						sum2_date		: values.sum2_date,	//하계휴가
						giv1_date		: values.giv1_date,	//추석휴가
						giv2_date		: values.giv2_date,	//추석휴가
						bud1_date		: values.bud1_date,	//부처님오신날
						bud2_date		: values.bud2_date	//부처님오신날
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "등록이 완료 되었습니다.");
					store.reload();
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
				}
			});
		}
	}
});
