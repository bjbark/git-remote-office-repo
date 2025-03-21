Ext.define('module.custom.iypkg.prod.workbookv1.view.WorkBookV1FailPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-fail-popup',
	alias	: 'widget.lookup-fail-popup',

	title	: '유실보고',
	closable: true,
	autoShow: true,
	width	: 600,
	height	: 660,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createView()];
		me.callParent(arguments);

		var work_numb;
		//마지막 작업 불러오기
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
			method		: "POST",
			async		: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					invc_numb	: me.popup.params.invc_numb,
					line_seqn	: me.popup.params.line_seqn
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				work_numb = result.records[0].invc_numb
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});

		//유실 조회
		var store = Ext.ComponentQuery.query('module-workbookv1-fail')[0].getStore(),
			param = Ext.merge({ invc_numb : work_numb
			})
		;

		store.load({
			params : { param:JSON.stringify(
				param
			)},
			scope:this,
			callback:function(records, operation, success) {
			}
		});

	},

	createView: function(){
		var me = this, form =
		{
			xtype :'form-layout' ,
			region:'center',
			border:false,
			items : [ me.createForm() ]  //me.createToolbar(),

		};
		return form;
	},

	createForm: function(){
		var me = this,
			form = {
				xtype: 'form-panel',
				region: 'center',
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 190', region:'north',
						items	: [
							{	text : '<span class="btnTemp" style="font-size:2.5em;">유실보고</span>'  ,
								xtype : 'button',
								handler:  function(){
									me.fail()
								},
								cls: 'button-left btn btn-danger',
								width: 150,
								height: 50,
								margin: '0 0 0 237'
							}
						]
					},{	xtype : 'module-workbookv1-fail', region:'center' , flex : 1, height:500 ,margin: '0 0 0 0', itemId : 'grid1'
					}
				],
				buttons: [
					{	text	: '<span class="btnTemp" style="font-size:2.5em">닫기</span>',
						cls		: 'button-style',
						flex	: 1,
						height	: 50,
						handler	: function() {
							var poor  = me.down('[itemId=grid1]'),
								store = poor.getStore(),
								n = 0, request = []
							;
//							store.each(function(record){
//								n = n + Number(record.get('poor_qntt'));
//							});
//
//							request.push({
//								qntt : Number(n)
//							});
							me.setResponse(request);

						}
					}
				]
			}
		;
		return form;
	},

	fail : function (rec) {
		var me = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'fail',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth     : 150,
				labelStyle     : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		: Language.get('loss_msg','시간 입력 후 유실 유형을 선택하여 주십시오.'),
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 10 89'
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('sttm','시간'),
							name		: 'sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							labelWidth	: 160,
							submitFormat: 'Hi',
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							width		: 280,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							trigger1Cls : 'hideCls timeTrigger1',				// trigger(버튼)에 클래스 추가
							listConfig	:{
								itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
							},
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.timeTrigger1')[0];
									Ext.get(trigger1).dom.click();
								}
							},
							cls			: 'textTemp'
						},{	fieldLabel	: Language.get('','~'),
							name		: 'edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							margin		: '0 0 0 10',
							labelWidth	: 30,
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							width		: 150,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							cls			: 'textTemp',
							trigger1Cls : 'hideCls timeTrigger2',				// trigger(버튼)에 클래스 추가
							listConfig	:{
								itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
							},
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.timeTrigger2')[0];
									Ext.get(trigger1).dom.click();
								}
							},
						}
					]
				},
				],
				buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel','취소')+'</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
				]
				});
				var array2;
				Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
				method		: "POST",
				async: false,
				params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6100",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
				},
				success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array2 = result.records;
				}
				},
				failure : function(response, request) {
				resource.httpError(response);
				},
				callback : function() {
				}
				});
				var point2 = 4;
				for (var i = 0; i < array2.length; i++) {
				form.insert(point2,						//위치
				{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array2[i].base_name+'</span>',
					itemId	: i,
					listeners :{
						click : function(){
							var param = Ext.merge( this.up('form').getValues() );
							me.failupdate(array2[this.itemId].base_code,param);
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30'
				}
				);
				point2++;
				}
				win = Ext.widget('window', {
				title		: '<span class="btnTemp" style="font-size:16px; color:black;">'+Language.get('lost_repo','유실보고')+'</span>',
				closeAction	: 'hide',
				width		: 586,
				height		: 230+((80)*(Math.ceil(array2.length/3))),
				layout		: 'fit',
				resizable	: true,
				modal		: true,
				items		: form,
				defaultFocus: ''
				});
				win.show();
				win.tools.close.hide ();  // 닫기버튼 hide
	},

	failupdate : function (val, param) {
		var me = this,
			sttm1     = param.sttm,
			edtm1     = param.edtm,
			sttm      = sttm1.replace(':',''),
			edtm      = edtm1.replace(':',''),
			detail    = Ext.ComponentQuery.query('module-workbookv1-lister')[0],
			fail      = Ext.ComponentQuery.query('module-workbookv1-fail')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			loss_time = 0.
			sttm_hour = sttm.substring(0,2)
			sttm_min  = sttm.substring(2,4)
			edtm_hour  = edtm.substring(0,2)
			edtm_min  = edtm.substring(2,4)
			time = edtm_hour-sttm_hour,
			min  = edtm_min-sttm_min,
			work_numb = '', work_seqn =''
		;

		//마지막 작업 불러오기
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
			method		: "POST",
			async		: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					invc_numb	: me.popup.params.invc_numb,
					line_seqn	: me.popup.params.line_seqn
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				work_numb = result.records[0].invc_numb,
				work_seqn = result.records[0].line_seqn
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});

		if(sttm1==null||edtm1==null||sttm1==''||edtm1==''||sttm>edtm){
			Ext.Msg.alert("알림","시간을 다시 입력하여주십시오.");
		}else{
			if(min < 0){
				time = edtm_hour-sttm_hour-1;
				min  = edtm_min-sttm_min + 60;
			}
			var total = (time*60)+min;
			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kitec/prod/workentry/get/failseqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: work_numb
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
					line_seqn = result.records[0].line_seqn;
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/iypkg/prod/workbookv1/set/fail.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: work_numb,
						line_seqn		: line_seqn,
						invc_date		: select.get('invc_date'),
						cvic_idcd		: select.get('cvic_idcd'),
						loss_resn_dvcd	: val,
						sttm			: sttm+'00',
						edtm			: edtm+'00',
						loss_time		: total,
						loss_pcnt		: 0,
						loss_mnhr		: 0,
						work_dsct_yorn	: 0,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
					fail.getStore().reload();
				}
			});
		}
	},

});
