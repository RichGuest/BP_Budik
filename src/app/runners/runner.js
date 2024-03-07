
addEventListener('testSave', (resolve, reject, args) => {
    try {
        CapacitorKV.set('foo', 'my test bar');
        resolve();
    } catch (err) {
        reject(err)
    }

});

addEventListener('testLoad', (resolve, reject, args) => {
    try {
        const value = CapacitorKV.get('foo');
        resolve(value);
    } catch (err) {
        reject(err);
    }
});

addEventListener('alarm.check', async (resolve, reject, args) => {
    console.log('Background alarm check started');
    try {
        const alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const currentDay = now.getDay().toString(); // Sunday is 0, Monday is 1, and so on.

        const triggeredAlarms = alarms.filter(alarm => {
            return alarm.enabled && alarm.days.includes(currentDay) && alarm.time === currentTime;
        });
        console.log(`Alarm check found ${triggeredAlarms.length} alarms`);
        if (triggeredAlarms.length > 0) {
            console.log('Triggering local notifications for alarms');
            triggeredAlarms.forEach(alarm => {
               
            });
        }
        console.log('Background alarm check completed successfully');
        resolve('Alarm check completed successfully.');
    } catch (err) {
        console.error('Error in alarm.check event listener:', err);
        reject(err);
    }
});