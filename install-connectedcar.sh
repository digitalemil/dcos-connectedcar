#!/bin/bash
read -p "Install services? (y/n) " -n1 -s c
if [ "$c" = "y" ]; then
	echo yes
	dcos package install --yes marathon-lb
	dcos package install --yes cassandra
	dcos package install --yes kafka
	dcos package install --yes elastic
	read -p "Press any key when the services are started." -n1 -s 
else
	echo no
fi
echo
if  [[ $1 == http* ]] 
then
	export PUBLICELBHOST=$(echo $1 | awk -F/ '{print $3}')
else
echo $1 | awk -F/ '{print $3}'
	export PUBLICELBHOST=$(echo $1 | awk -F/ '{print $1}')
fi
cp config.json config.tmp
sed -ie "s@PUBLIC_SLAVE_ELB_HOSTNAME@$PUBLICELBHOST@g"  config.tmp

cp setmodel.template setmodel.sh
sed -ie "s@PUBLIC_SLAVE_ELB_HOSTNAME@$PUBLICELBHOST@g" setmodel.sh
rm setmodel.she

cp clearmodel.template clearmodel.sh
sed -ie "s@PUBLIC_SLAVE_ELB_HOSTNAME@$PUBLICELBHOST@g" clearmodel.sh
rm clearmodel.she

dcos marathon group add config.tmp
rm config.tmpe
