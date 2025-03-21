Ext.define('module.custom.komec.prod.order.workbook.view.WorkBookPoorPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-komec-workbook-poor-popup',
	alias	: 'widget.lookup-komec-workbook-poor-popup',

	title	: '불량보고',
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

		//불량 조회
		var store = Ext.ComponentQuery.query('module-komec-workbook-poor')[0].getStore(),
			param = Ext.merge({ invc_numb : me.popup.param.invc_numb
			})
		;

		store.load({
			params : { param:JSON.stringify(
				param
			)},
			scope:this,
			callback:function(records, operation, success) {
				console.log(records);
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
							{	text : '<span class="btnTemp" style="font-size:2.5em;">불량보고</span>'  ,
								xtype : 'button',
								handler:  function(){
									me.poor()
								},
								cls: 'button-left btn btn-danger',
								width: 150,
								height: 50,
								margin: '0 0 0 237'
							}
						]
					},{	xtype : 'module-komec-workbook-poor', region:'center' , flex : 1, height:500 ,margin: '0 0 0 0', itemId : 'grid1'
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

	poor : function (rec) {
		var me = this,
			poorLookup = new Array()
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'poor',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth     : 150,
				labelStyle     : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:'불량수량을 입력 후 불량유형을 선택하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 0 62'
				},{	fieldLabel	: Language.get('poor_qntt', '불량수량'),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',							// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',							// field에 클래스추가
					xtype		: 'popupfield',
					editable	: false,
					enableKeyEvents : true,
					name		: 'poor_qntt',
					width		: 430,
					height		: 50,
					maxWidth	: 500,
					labelWidth	: 210,
					margin		: '20 0 0 0',
					listConfig	:{
						itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
					handleMouseEvents:true,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.trigger1qc2')[0];
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
					trigger1Cls : 'hideCls trigger1qc2',
				},
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		var array;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6000",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point = 4;
		for (var i = 0; i < array.length; i++) {
			form.insert(point,{	xtype   : 'button',
				text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array[i].base_name+'</span>',
				cls     : 'poorbutton-style',
				itemId	: i,
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var param = Ext.merge( this.up('form').getValues() );
						me.poorupdate(array[this.itemId].base_code,array[this.itemId].base_name,param);
					}
				}
			});
			point++;
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">불량내역</span>',
			closeAction	: 'hide',
			width		: 581,
			height		: 230+((80)*(Math.ceil(array.length/3))),
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},

	poorupdate : function (val, val2, param) {
		var me = this,
			poor_bacd = val,
			poor_qntt = param.poor_qntt,
			poor      = Ext.ComponentQuery.query('module-komec-workbook-poor')[0],
			store     = poor.getStore(),
			record, line_seqn, work_numb
		;
		if(poor_qntt==0||poor_qntt==''||poor_qntt==null){
			Ext.Msg.alert("알림","불량수량을 반드시 입력하여 주십시오.");
		}else{
			//line_seqn count
			var line_seqn = 0;
			store.each(function(rec){
				if(line_seqn < rec.get('line_seqn')){
					line_seqn = rec.get('line_seqn');
				}
			})
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/komec/prod/workbook/set/poor.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: me.popup.param.invc_numb,
						line_seqn		: line_seqn,
						invc_date		: Ext.Date.format(new Date(),'Ymd'),
						poor_bacd		: poor_bacd,
						good_qntt		: null,
						poor_qntt		: poor_qntt,
						loss_qntt		: null,
						runn_dsct_yorn	: null
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
					Ext.ComponentQuery.query('#poor')[0].up('window').destroy();
					store.reload();
				}
			});
		}
	},

});
