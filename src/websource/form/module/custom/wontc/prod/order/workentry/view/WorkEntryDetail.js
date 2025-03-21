Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryDetail', { extend: 'Axt.grid.Panel',
	id			: 'module-wontc-workentry-detail',
	alias		: 'widget.module-wontc-workentry-detail',
	store		: 'module.custom.wontc.prod.order.workentry.store.WorkEntryDetail',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-wontc-workentry-detailsearch'}];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{ header	: '실행',
						sortable: false,
						width	: 120,
						align	: 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id(),
								search = Ext.ComponentQuery.query('module-wontc-workentry-detailsearch')[0],
								value  = search.getValues()
							;
							var prog_stat_dvcd = value.prog_stat_dvcd; // 0 대기 , 2 중단 ,3 완료
							if(prog_stat_dvcd == '0'|| prog_stat_dvcd == '2'){
								Ext.defer(function() {
									Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										text	: '<span class="btnTemp" style="font-size:1.5em;font-weight: bold;">작업보고</span>',
										cls		: 'btn btn-success btnTemp '+_global.options.work_book_tema+'button',
										width	: 100,
										height	: 37,
										handler: function(){me.popup(rec)}
									});
								}, 50);
							}else if(prog_stat_dvcd == '3'){
								Ext.defer(function() {
									Ext.widget('button', {
										width	: 100,
										height	: 37,
										renderTo: Ext.query("#"+id)[0],
										text	: '<span class="btnTemp" style="font-size:1.5em;font-weight: bold;">취소</span>',
										cls		:'btn btn-danger btnTemp '+_global.hq_id+'button',
										handler:  function(){me.cancel(rec)},
									});
								}, 50);
							}
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		)	, width	: 70	, xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","진행중"],["2","지연"],["3","완료"]], align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'수주처'	)	, width	: 170	, align : 'center'
					},{ dataIndex: 'drwg_numb'		, text : Language.get('drwg_numb'		,'도면번호'	)	, width	: 200	, align : 'left'
					},{ dataIndex: 'revs_numb'		, text : Language.get('revs_numb'		,'Rev'		)	, width	: 80	, align : 'center'
					},{ dataIndex: 'acpt_case_name'	, text : Language.get('acpt_case_name'	,'모델명'	)	, width	: 150	, align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		)	, flex	: 1		, minWidth : 200, align : 'left'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'	)	, width	: 100	, align : 'center'
					},{ dataIndex: 'wkfw_seqn'		, text : Language.get('wkfw_seqn'		,'공정순서'	)	, width	: 80	, align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	)	, width	: 80	, align : 'right'
					},{ dataIndex: 'good_qntt'		, text : Language.get('good_qntt'		,'양품수량'	)	, width	: 80	, align : 'right'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	)	, width	: 80	, align : 'right'
					},{ dataIndex: 'user_name'		, text : Language.get('user_name'		,'작업자'	)	, width	: 100	, align : 'center'
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자'	)	, width	: 150	, align : 'center'
					}
				]
			}
		;
		return item;
	},

	popup : function (rec) {
		var	form = Ext.widget('form', {
			id	: 'form1',
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 150,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '10 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '0 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('cstm_name','수주처'),
									name		: 'cstm_name',
									xtype		: 'textfield',
									width		: 515,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: rec.data.cstm_name
								},{ xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('modl_name','모델명'),
									name		: 'modl_name',
									xtype		: 'textfield',
									width		: 515,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: rec.data.acpt_case_name
								},{	fieldLabel	: Language.get('invc_qntt','수주량'),
									name		: 'invc_qntt',
									xtype		: 'numericfield',
									width		: 315,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: rec.data.invc_qntt
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0, margin : '20 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('drwg_numb','도면번호'),
									name		: 'drwg_numb',
									xtype		: 'textfield',
									margin		: '0 0 0 0',
									width		: 360,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 40px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: rec.data.drwg_numb
								},{	name		: 'revs_numb',
									xtype		: 'textfield',
									margin		: '0 0 0 5',
									width		: 150,
									height		: 45,
									readOnly	: true,
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									value		: rec.data.revs_numb
								}
							]
						},{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '3 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('item_name','품명'),
									name		: 'item_name',
									xtype		: 'textfield',
									width		: 515,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: rec.data.item_name
								},{	fieldLabel	: Language.get('indn_qntt','지시수량'),
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									width		: 315,
									height		: 45,
									readOnly	: true,
									fieldCls	: 'requiredindex',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: rec.data.indn_qntt
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0, margin : '20 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('invc_date','invoice일자'),
									name		: 'invc_date',
									xtype		: 'datefield',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date(),
									hidden		: true,
								},{	fieldLabel	: Language.get('strt_date','시작일시'),
									name		: 'strt_date',
									xtype		: 'datefield',
									value		: '',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									maxValue	: new Date(),
									readOnly	: false,
									value		: new Date(),
									width		: 275,
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'dateTrigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									margin		: '2 40 2 0',
									listeners	: {
										change	:function(field,val){
											form.down('[name=endd_date]').setMinValue(val);
										}
									}
								},{	fieldLabel	: Language.get('',''),
									name		: 'strt_time',
									xtype		: 'timefield',
									format		: 'H:i',
									submitFormat: 'Hi',
									minValue	: '00:00 AM',
									maxValue	: '23:59 PM',
									margin		: '2 40 2 30',
									value		: '09:00',
									width		: 100,
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'trigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									listConfig:{
										itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
									},
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0,
							items	: [
								{	fieldLabel	: Language.get('endd_date','종료일시'),
									name		: 'endd_date',
									xtype		: 'datefield',
									value		: '',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									readOnly	: false,
									width		: 275,
									minValue	: new Date(),
									value		: new Date(),
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'dateTrigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									margin		: '2 40 2 0'
								},{	fieldLabel	: Language.get('',''),
									name		: 'endd_time',
									xtype		: 'timefield',
									format		: 'H:i',
									submitFormat: 'Hi',
									minValue	: '00:00 AM',
									maxValue	: '23:59 PM',
									margin		: '2 40 0 30',
									value		: '18:00',
									width		: 100,
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'trigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									listConfig:{
										itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
									},
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0, margin : '0 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '0 0 0 0', padding : 0,
									items	: [
										{	fieldLabel	: Language.get('poor_qntt','불량수량'),
											name		: 'poor_qntt',
											xtype		: 'popupfield',
											width		: 333,
											height		: 45,
											readOnly	: false,
											labelStyle	: 'font-size:1.7em; line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
											labelWidth	: 90,
											trigger1Cls : 'hideCls trigger1',
											handleMouseEvents:true,
											listeners:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.trigger1')[0];
														Ext.get(trigger1).dom.click();
													});
												}
											},
											popup: {
												select	: 'SINGLE',
												widget	: 'lookup-keypad-popup',
												params	: { stor_grp : _global.stor_grp},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].result);
												}
											}
										},{	fieldLabel	: Language.get('good_qntt','양품수량'),
											name		: 'good_qntt',
											xtype		: 'popupfield',
											width		: 333,
											height		: 45,
											readOnly	: false,
											labelStyle	: 'font-size:1.7em; line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
											labelWidth	: 90,
											trigger1Cls : 'hideCls trigger2',
											handleMouseEvents:true,
											listeners:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.trigger2')[0];
														Ext.get(trigger1).dom.click();
													});
												}
											},
											popup: {
												select	: 'SINGLE',
												widget	: 'lookup-keypad-popup',
												params	: { stor_grp : _global.stor_grp},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].result);
												}
											},
										},{	fieldLabel	: Language.get('user_name','작업자'),
											width		: 275,
											height		: 45,
											value		: '',
											readOnly	: false,
											labelStyle	: 'font-size:1.7em; line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
											labelWidth	: 90,
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											name		: 'user_name',
											pair		: 'wker_idcd',
											trigger1Cls : _global.options.work_book_tema+'searchTrigger',
											clearable	: false ,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-user-popup',
												params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema},
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name		: 'wker_idcd', xtype : 'textfield' , hidden : true
										},{	name		: 'wkod_numb', xtype : 'textfield' , hidden : true
										},{	name		: 'wkod_seqn', xtype : 'textfield' , hidden : true
										}
									]
								},{	text : '<span class="btnTemp" style="font-size:2em; font-weight:bold;">제작완료</span>'  ,
									xtype	: 'button',
									itemId	: 'commit',
									cls		: 'button-left btn btn-primary',
									width	: 180,
									height	: 135,
									margin	: '5 0 0 10',
									handler : function(){
										var form = Ext.getCmp('module-wontc-workentry-detail');
										form.complete(rec, 1);
									}
								}
							]
						}
					]
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:2em; font-weight:bold;">확인</span>',
					itemId	: 'ok',
					cls		: 'button-style',
					width	: 100,
					height	: 50,
					handler	: function(){
						var form = Ext.getCmp('module-wontc-workentry-detail');
						form.commit(rec, 2);
					}
				},{	text	: '<span class="btnTemp" style="font-size:2em; font-weight:bold;">취소</span>',
					cls		: 'button-style',
					width	: 100,
					height	: 50,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">작업보고</span>',
			closeAction: 'close',
			width: 600,
			height: 710,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();
	},

	complete : function(rec, dvcd){
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 200,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		: '제작완료시 해당 공정은 더이상 작업보고 할 수 없습니다. 제작완료 하시겠습니까?',
					cls			: 'textTemp',
					style	: 'font-size:2.2em;'
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var form = Ext.getCmp('module-wontc-workentry-detail');
						form.commit(rec, 1);
						this.up('window').destroy();
					}
				},
				{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">제작완료</span>',
			closeAction: 'close',
			width: 450,
			height: 200,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();
	},

	commit : function(rec, dvcd){
		var me     = this,
			form   = Ext.getCmp('form1'),
			store  = me.getStore(),
			new_invc_numb, good_qntt, poor_qntt,invc_date,wker_idcd,work_strt_dttm,work_endd_dttm,prog_stat_dvcd
		;
		console.log(rec);
		if(dvcd == '1'){		//제작완료이면 지시수량 = 양품수량으로 저장
			good_qntt = rec.data.indn_qntt;
			poor_qntt = '0';
			wker_idcd = _global.login_pk;
			prog_stat_dvcd = '3';
		}else if(dvcd == '2'){	//양품수량, 불량수량 입력후 저장
			good_qntt = form.down('[name=good_qntt]').getValue();
			poor_qntt = form.down('[name=poor_qntt]').getValue();
			wker_idcd = form.down('[name=wker_idcd]').getValue();
			prog_stat_dvcd = '2';
		}

		invc_date = Ext.Date.format(new Date(),'Ymd');
		strt_date = Ext.Date.format(form.down('[name=strt_date]').getValue(),'Ymd');
		strt_time = Ext.Date.format(form.down('[name=strt_time]').getValue(),'Hi');
		endd_date = Ext.Date.format(form.down('[name=endd_date]').getValue(),'Ymd');
		endd_time = Ext.Date.format(form.down('[name=endd_time]').getValue(),'Hi');
		work_strt_dttm = strt_date+''+strt_time;
		work_endd_dttm = endd_date+''+endd_time;

		if(poor_qntt == '' || poor_qntt == null){
			Ext.Msg.alert("알림", "불량수량을 입력해주십시오.");
			return;
		}else if(good_qntt == '' || good_qntt == null){
			Ext.Msg.alert("알림", "양품수량을 입력해주십시오.");
			return;
		}else if(wker_idcd == '' || wker_idcd == null){
			Ext.Msg.alert("알림", "작업자를 입력해주십시오.");
			return;
		}else if(work_strt_dttm == '' || work_strt_dttm == null || work_strt_dttm.length < 12){
			Ext.Msg.alert("알림", "시작일시를 입력해주십시오.");
			return;
		}else if(work_endd_dttm == '' || work_endd_dttm == null || work_endd_dttm.length < 12){
			Ext.Msg.alert("알림", "종료일시를 입력해주십시오.");
			return;
		}else if(work_strt_dttm > work_endd_dttm){
			Ext.Msg.alert("알림", "시작일시는 종료일시보다 이후일 수 없습니다.");
			return;
		}else if(good_qntt < form.down('[name=indn_qntt]').getValue()){
			Ext.Msg.alert("알림", "양품수량을 다시 입력해주십시오.");
			return;
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/listener/seq/maxid.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'work_book'
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
						new_invc_numb = result.records[0].seq;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			record = Ext.create( store.model.modelName , {
				new_invc_numb	: new_invc_numb,
				invc_date		: invc_date,
				work_strt_dttm	: work_strt_dttm,
				work_endd_dttm	: work_endd_dttm,
				wkct_idcd		: rec.data.wkct_idcd,
				cstm_idcd		: rec.data.cstm_idcd,
				item_idcd		: rec.data.item_idcd,
				wkod_numb		: rec.data.invc_numb,
				wkod_seqn		: rec.data.line_seqn,
				indn_qntt		: rec.data.indn_qntt,
				good_qntt		: good_qntt,
				poor_qntt		: poor_qntt,
				wker_idcd		: wker_idcd,
				prog_stat_dvcd	: prog_stat_dvcd,
			});
			store.add(record);
			store.sync({
				callback: function(batch, options) {
					form.getForm().reset();
					form.up('window').destroy();
					store.reload();
				}
			},{	_set : 'insert'} );
		}
	},

	cancel : function (rec) {
		var search = Ext.ComponentQuery.query('module-wontc-workentry-detailsearch')[0],
			wkct_idcd = rec.data.wkct_idcd,
			store = this.getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '취소하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								wkod_numb		: rec.data.invc_numb,
								wkod_seqn		: rec.data.line_seqn,
								wkct_idcd		: rec.data.wkct_idcd,
								prog_stat_dvcd	: '0'
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').destroy();
								} ,
								scope: this
							},{_set : 'cancel'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').destroy();
						}
					}
				]
			});
			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">취소</span>',
				closeAction: 'hide',
				width: 500,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();
	},

});