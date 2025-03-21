Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerSearch4', { extend: 'Axt.form.Search',
	store	: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice4',
	alias	: 'widget.module-estimast2-worker-search4',
	style	: 'padding-top : 1px;' ,
	height	: 55,
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1(), me.createLine2()];
		me.callParent();
	},

	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 200,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text		: '개발내역' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'devl_ctnt',
								width		: 300,
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=amnt]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 120 ,
						items	: [
							{	text		: '금액', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'amnt',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=remk_text]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 400 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '비고', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'remk_text',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											{	if (self.up('form').down('[name=devl_ctnt]').getValue().trim() != '') {
													me.appendItem({});
												}
											}
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							},{	name	: 'prnt_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					}
				]
			}
		;
		return line;
	},

	createLine2 : function () {
		var me = this,
			line = {
				xtype	: 'container',
				margin	: '0 0 0 0',
				itemId	: 'itemviewer',
				layout	: 'border',
				border	: 1,
				style	: Const.borderLine.top +  Const.borderLine.bottom ,
				height	: 35,
				html	: ''
			}
		;
		return line;
	},

	/**
	 * 품목 데이터를 조회한다.
	 */
	selectItem : function (config) {
		var me		= this,
			panel	= config.panel,
			length	= config.records.length
		;
		Ext.each(config.records, function(record, index) {
			me.attachItem( { panel : config.panel , record : record , append : (length > 1) } );
		});
	},

	/**
	 * 품목 정보를 첨부 시킨다.
	 */
	attachItem : function (config) {
		var me = this,
			clear	= config.clear,
			record	= config.record,
			html	= config.html || ''
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
			me.down('#itemviewer').update( html );
		} else {
			me.down('[name=devl_ctnt]'	).setValue(record.get('devl_ctnt' ));
			me.down('[name=remk_text]'	).setValue(record.get('remk_text' ));
			me.down('[name=amnt]'		).setValue(record.get('amnt' ));
			if (config.append) {
				me.appendItem( { panel : config.panel });
			} else {
				html = '<div>'
					 + '  <div style = "width: 100;  float : left" >'
					 + '  	<div>계정구분</div><div>'+ record.get('acct_bacd_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 300;  float : left" >'
					 + '  	<div>품목분류</div><div>'+ record.get('clss_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>모델명</div><div>'+ record.get('modl_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>입고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>출고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
					 + '</div>'
				;
				me.down('#itemviewer').update( html );
			}
		}
	},

	/**
	 * 입력된 상품을 등록한다.
	 */
	appendItem : function (config) {
		var me			= this,
			store		= me.ownerCt.getStore(),
			editor		= Ext.ComponentQuery.query('module-estimast2-worker-editor3')[0],
			detail		= Ext.ComponentQuery.query('module-estimast2-lister-detail')[0],
			records		= detail.getSelectionModel().getSelection();
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn	= undefined,
			max_seq		= 0
		;
		var seq = editor.getSEQ();
		var dsp = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		store.each(function(findrecord) {
			if (findrecord.get('assi_seqn') > max_seq) {
				max_seq	= findrecord.get('assi_seqn');   // max값으로 마지막값을 찾음.
			}
		})
		if (uper_seqn == undefined) {
			uper_seqn = me.down('[name=prnt_idcd]').getValue();
		}
		max_seq = max_seq + 1;
			record = Ext.create( store.model.modelName , {
				assi_seqn		: max_seq,
//				line_seqn		: records[0].get('line_seqn'),
				line_seqn		: seq,
				uper_seqn		: uper_seqn,
				disp_seqn		: dsp,
				prnt_idcd		: uper_seqn,
				devl_ctnt		: me.down('[name=devl_ctnt]').getValue(),
				remk_text		: me.down('[name=remk_text]').getValue(),
				amnt			: me.down('[name=amnt]').getValue(),
			});

		store.each(function(findrecord) {
			if (   findrecord.get('devl_ctnt') == record.get('devl_ctnt')
				&& findrecord.get('remk_text') == record.get('remk_text')) {
				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("qntt", findrecord.get('amnt') + record.get('amnt'));
			}
		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}

		me.attachItem({ clear : true });
	}
});
