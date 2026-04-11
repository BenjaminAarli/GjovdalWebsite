<script lang="ts">
    export let data;

    interface Purchase {
        id: string;
        fullname: string;
        email: string;
        phone: string;
        created_at: string | null;
        updated_at: string | null;
        ticket: Ticket[];
        status?: string;
    }

    let purchases: Purchase[] = data.purchases;
    function calculate_time_passed(isoString: string | null): string {
        if (!isoString) return 'Unknown Time ago.';

        const now = new Date();
        const then = new Date(isoString);

        const diff_ms       = now.getTime() - then.getTime();
        const diff_sec      = Math.floor(diff_ms / 1000);
        const diff_min      = Math.floor(diff_sec / 60);
        const diff_hours    = Math.floor(diff_min / 60);
        const diff_days     = Math.floor(diff_hours / 24);

        if (diff_sec < 60) return "Just now";
        if (diff_min < 1)  return "a minute ago";
        if (diff_min < 60) return diff_min + " minutes ago";
        if (diff_hours === 1) return "an hour ago";
        
        return diff_hours + " hours ago.";
    }
</script>

<div style="width: 100%; height: 100%; background-color: slate; display: flex; flex-direction: column; gap: 16px; justify-content: center; align-items: center;">
    {#each purchases as purchase}
        <div style="width: auto; height: auto; border: 1px solid grey; background-color: whitesmoke; border-radius: 16px; padding: 8px; margin-left: 16px; margin-right: 16px; margin: 8px; display: flex; flex-direction: row;">
            <div style="display: flex; flex-direction: column;">
                <p>{purchase.fullname}</p>
                <p>Ticket ID: {purchase.ID}</p>
                <!-- <pre style="background: #eee; padding: 8px; border-radius: 4px; font-size: 12px;">
                </pre> -->
                <p><br>Created at <br> {purchase.created_at}</p>
                <p>was created {calculate_time_passed(purchase.created_at)}</p>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between">
                <button style="background-color: slate; border: 1px solid green; border-radius: 8px;">Confirm</button>
                <button style="background-color: slate; border: 1px solid red; border-radius: 8px;" type='submit' >Deny</button>
            </div>     
        </div>
    {/each}
</div>

<div style="height: 800px;"></div>

<style>
    
</style>