Ext.define('module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemInvoice',
	alias	: 'widget.module-cvicchecktypeitem-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1()/*, me.createLine2() */];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 120,
						items	: [
							{	text		: '점검항목명', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'chek_sbsc_name',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=chek_cond]').focus(true, 10);
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
						width	: 300 ,
						items	: [
							{	text		: '점검조건', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'chek_cond',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=msmt_mthd_dvcd]').focus(true, 10);
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
						width	: 80 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '측정방법', xtype : 'label', style : 'text-align:center;'
							},{	xtype	: 'lookupfield',
								margin	: '2 2 2 2',
								name	: 'msmt_mthd_dvcd',
								lookupValue	: resource.lookup('msmt_mthd_dvcd'),
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=rslt_iput_dvcd]').focus(true, 10);
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
						width	: 70 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '입력구분', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'lookupfield',
								margin	: '2 2 2 2',
								name	: 'rslt_iput_dvcd',
								lookupValue	: resource.lookup('rslt_iput_dvcd'),
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=goal_levl]').focus(true, 10);
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
						margin	: '3 0 3 0',
						width	: 70,
						items	: [
							{	text	: '목표수준', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'numericfield',
								name	: 'goal_levl',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=uppr_valu]').focus(true, 10);
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
						margin	: '3 0 3 0',
						width	: 70,
						items	: [
							{	text		: '상한값', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'uppr_valu',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=lwlt_valu]').focus(true, 10);
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
						margin	: '3 0 3 0',
						width	: 70,
						items	: [
							{	text		: '하한값', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: 'lwlt_valu',
								margin		: '2 2 2 2',
								enableKeyEvents: true  ,
								listeners	:{
									keydown : function(self, e) {
										console.log(e.keyCode);
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=remk_text]').focus(true, 10);
											} else if (e.keyCode == e.ESC) {
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 250,
						items	: [
							{	text		: '메모', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'remk_text',
								flex		: 100,
								maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
								enableKeyEvents: true  ,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											if ( Ext.isEmpty( self.up('form').down('[name=chek_sbsc_name]').getValue()) ){
												self.up('form').down('[name=chek_sbsc_name]').focus(true, 10);
											} else {
												if (e.keyCode == e.ENTER) {
															me.appendItem({});
												} else if (e.keyCode == e.ESC) {
													me.attachItem({ clear : true });
												}
											}
										}
									}
								}
							}
						]
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
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
	 * 항목 데이터를 조회한다.
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
	 * 항목 정보를 첨부 시킨다.
	 */
	attachItem : function (config) {
		var me = this,
			clear	= config.clear,
			record	= config.record
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
		} else {
			console.log(record);
			me.down('[name=chek_sbsc_name]'	).setValue(record.get('chek_sbsc_name' ));
			me.down('[name=chek_cond]'		).setValue(record.get('chek_cond' ));
			me.down('[name=msmt_mthd_dvcd]'	).setValue(record.get('msmt_mthd_dvcd' ));
			me.down('[name=rslt_iput_dvcd]'	).setValue(record.get('rslt_iput_dvcd' ));
			me.down('[name=goal_levl]'		).setValue(record.get('goal_levl' ));
			me.down('[name=uppr_valu]'		).setValue(record.get('uppr_valu' ));
			me.down('[name=lwlt_valu]'		).setValue(record.get('lwlt_valu' ));
			me.down('[name=remk_text]'		).setValue(record.get('remk_text'));
		}
	},

	/**
	 * 입력된 상품을 등록한다.
	 */
	appendItem : function (config) {
		var me			= this,
			store		= me.ownerCt.getStore(),
			editor		= me.ownerCt.editor,
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn   = undefined
		;
		var seq = editor.getSEQ();
		var dsp = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = me.down('[name=prnt_idcd]').getValue();
		}

		record = Ext.create( store.model.modelName , {
			line_seqn			: seq,
			uper_seqn			: uper_seqn,
			disp_seqn			: dsp,
			prnt_idcd			: uper_seqn,
			chek_sbsc_name		: me.down('[name=chek_sbsc_name]').getValue(),
			chek_cond			: me.down('[name=chek_cond]').getValue(),
			msmt_mthd_dvcd		: me.down('[name=msmt_mthd_dvcd]').getValue(),
			rslt_iput_dvcd		: me.down('[name=rslt_iput_dvcd]').getValue(),
			goal_levl			: me.down('[name=goal_levl]').getValue(),
			uppr_valu			: me.down('[name=uppr_valu]').getValue(),
			lwlt_valu			: me.down('[name=lwlt_valu]').getValue(),
			remk_text			: me.down('[name=remk_text]').getValue()
			});

			store.each(function(findrecord) {
			if (   findrecord.get('chek_sbsc_name') == record.get('chek_sbsc_name')
				&& findrecord.get('chek_cond') == record.get('chek_cond')
				&& findrecord.get('msmt_mthd_dvcd') == record.get('msmt_mthd_dvcd')
				&& findrecord.get('rslt_iput_dvcd') == record.get('rslt_iput_dvcd')
				&& findrecord.get('goal_levl') == record.get('goal_levl')
				&& findrecord.get('uppr_valu') == record.get('uppr_valu')
				&& findrecord.get('lwlt_valu') == record.get('lwlt_valu')
				&& findrecord.get('remk_text') == record.get('remk_text')) {
				is_equal = true;
			}
		});

		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}
		me.attachItem({ clear : true });
	}
});
